'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle2, XCircle, Copy } from 'lucide-react';
import QRCode from 'qrcode';
import Image from 'next/image';
import { fetchWithCsrf } from '@/lib/fetchWithCsrf';

interface MFASettingsProps {
  initialEnabled: boolean;
  initialBackupCodes?: string[];
  initialRecoveryCode?: string;
  initialRecoveryCodeExpiresAt?: Date | null;
  initialDeviceFingerprint?: string;
}

export function MFASettings({
  initialEnabled,
  initialBackupCodes = [],
  initialRecoveryCode = '',
  initialRecoveryCodeExpiresAt = null,
  initialDeviceFingerprint = ''
}: MFASettingsProps) {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [token, setToken] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>(initialBackupCodes);
  const [recoveryCode, setRecoveryCode] = useState<string>(initialRecoveryCode);
  const [recoveryCodeExpiresAt, setRecoveryCodeExpiresAt] = useState<Date | null>(initialRecoveryCodeExpiresAt);
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>(initialDeviceFingerprint);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);

  const startSetup = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/generate', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to generate MFA secret');
      
      const data = await res.json();
      setSecret(data.secret);
      
      const qrUrl = await QRCode.toDataURL(data.otpauth);
      setQrCodeUrl(qrUrl);
      setIsSetupOpen(true);
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start MFA setup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndEnable = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/enable', {
        method: 'POST',
        body: JSON.stringify({ token, secret }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to verify token');
      }

      const data = await res.json();
      
      setIsEnabled(true);
      setIsSetupOpen(false);
      setToken('');
      setSecret('');
      setQrCodeUrl('');
      
      // Update state with new security features
      if (data.backupCodes) setBackupCodes(data.backupCodes);
      if (data.recoveryCode) setRecoveryCode(data.recoveryCode);
      if (data.recoveryCodeExpiresAt) setRecoveryCodeExpiresAt(new Date(data.recoveryCodeExpiresAt));
      if (data.deviceFingerprint) setDeviceFingerprint(data.deviceFingerprint);
      
      toast({
        title: "MFA Enabled",
        description: "Two-factor authentication has been successfully enabled with enhanced security features.",
      });
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Invalid code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const disableMFA = async () => {
    if (!confirm("Are you sure you want to disable MFA? This will lower your account security.")) return;

    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/disable', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to disable MFA');

      setIsEnabled(false);
      toast({
        title: "MFA Disabled",
        description: "Two-factor authentication has been disabled.",
      });
      router.refresh();
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to disable MFA",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateNewRecoveryCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetchWithCsrf('/api/admin/auth/mfa/recovery', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to generate recovery code');
      
      const data = await res.json();
      setRecoveryCode(data.recoveryCode);
      setRecoveryCodeExpiresAt(new Date(data.recoveryCodeExpiresAt));
      setShowRecoveryCode(true);
      
      toast({
        title: "Recovery Code Generated",
        description: "A new recovery code has been generated and will expire in 7 days.",
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate recovery code",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-Factor Authentication (MFA)</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account by requiring a code from your authenticator app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-medium">Status</span>
              {isEnabled ? (
                <span className="flex items-center text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Enabled
                </span>
              ) : (
                <span className="flex items-center text-sm text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  <XCircle className="mr-1 h-3 w-3" />
                  Disabled
                </span>
              )}
            </div>
          </div>
          {!isEnabled && !isSetupOpen && (
            <Button onClick={startSetup} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Setup MFA
            </Button>
          )}
          {isEnabled && (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={disableMFA} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Disable MFA
              </Button>
              <Button variant="secondary" onClick={generateNewRecoveryCode} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Rotate Recovery Code
              </Button>
            </div>
          )}
        </div>

        {isSetupOpen && (
          <div className="space-y-4 rounded-lg border p-4 bg-muted/50">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">1. Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Open your authenticator app (like Google Authenticator or Authy) and scan this QR code.
                </p>
                <div className="flex justify-center p-4 bg-white rounded-lg w-fit">
                  {qrCodeUrl && (
                    <Image
                      src={qrCodeUrl}
                      alt="MFA QR Code"
                      width={192}
                      height={192}
                      className="h-48 w-48"
                    />
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">2. Enter Verification Code</h3>
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code generated by your authenticator app to verify setup.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="token">Verification Code</Label>
                  <Input
                    id="token"
                    placeholder="000000"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={verifyAndEnable} disabled={isLoading || token.length !== 6}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify & Enable
                  </Button>
                  <Button variant="ghost" onClick={() => setIsSetupOpen(false)} disabled={isLoading}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      
      {isEnabled && (
        <div className="mt-6 space-y-6">
          {/* Backup Codes Section */}
          {backupCodes.length > 0 && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Backup Codes</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBackupCodes(!showBackupCodes)}>
                  {showBackupCodes ? 'Hide' : 'Show'} Codes
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                These backup codes can be used to access your account if you lose access to your authenticator app.
              </p>
              {showBackupCodes && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-mono bg-muted px-2 py-1 rounded text-sm">{code}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6"
                        onClick={() => navigator.clipboard.writeText(code)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Store these codes securely. Each code can only be used once.
              </p>
            </div>
          )}

          {/* Recovery Code Section */}
          {recoveryCode && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recovery Code</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRecoveryCode(!showRecoveryCode)}>
                  {showRecoveryCode ? 'Hide' : 'Show'} Code
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                This recovery code can be used to access your account if you lose access to your authenticator app.
              </p>
              {showRecoveryCode && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono bg-muted px-3 py-2 rounded text-lg font-bold">{recoveryCode}</span>
                  <Button variant="ghost" size="icon"
                    onClick={() => navigator.clipboard.writeText(recoveryCode)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Expires:</span>
                <span className="font-medium">
                  {recoveryCodeExpiresAt ? recoveryCodeExpiresAt.toLocaleDateString() : 'Unknown'}
                </span>
                <Button variant="ghost" size="sm" onClick={generateNewRecoveryCode} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                  Rotate Code
                </Button>
              </div>
            </div>
          )}

          {/* Device Fingerprint Section */}
          {deviceFingerprint && (
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Device Fingerprint</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This device has been registered for MFA with a unique fingerprint for enhanced security.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
                  {deviceFingerprint}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6"
                  onClick={() => navigator.clipboard.writeText(deviceFingerprint)}>
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      </CardContent>
    </Card>
  );
}
