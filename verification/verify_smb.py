from playwright.sync_api import sync_playwright, expect

def verify_smb_site():
    with sync_playwright() as p:
        # Desktop Test
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        print("Navigating to Home (Desktop)...")
        page.goto("http://localhost:3000")

        print("Taking Desktop Screenshot (Pre-Assertion)...")
        page.screenshot(path="verification/desktop_home.png")

        # Check for Hero Text - "Math, not marketing"
        try:
            # Content is now unique in the DOM (Single Shell architecture)
            expect(page.get_by_text("Math, not marketing")).to_be_visible()
            print("Verified 'Math, not marketing'")
        except Exception as e:
            print(f"Failed to verify text: {e}")

        # Mobile Test
        print("Testing Mobile View...")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667}, user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1")
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:3000")

        print("Taking Mobile Screenshot...")
        page_mobile.screenshot(path="verification/mobile_home.png")

        # Check for Mobile Bottom Nav Item "Audit"
        try:
            expect(page_mobile.get_by_text("Audit", exact=True)).to_be_visible()
            print("Verified Mobile Nav 'Audit'")
        except Exception as e:
            print(f"Failed to verify mobile nav: {e}")

        browser.close()
        print("Verification Complete.")

if __name__ == "__main__":
    verify_smb_site()
