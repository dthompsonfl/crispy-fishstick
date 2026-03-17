from playwright.sync_api import sync_playwright, expect
import time

def verify_styles():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Retry logic for connection
        url = "http://localhost:3001"
        print(f"Connecting to {url}...")
        for i in range(10):
            try:
                page.goto(url, timeout=5000)
                break
            except Exception as e:
                print(f"Attempt {i+1} failed: {e}")
                time.sleep(2)
        else:
            raise Exception(f"Could not connect to {url}")

        # Wait for content
        print("Waiting for content...")
        try:
            page.wait_for_selector("h1", timeout=10000)
        except Exception as e:
            print("Title not found, dumping page content...")
            print(page.content())
            raise e

        # Check title
        title = page.title()
        print(f"Page title: {title}")

        # Take screenshot of the hero section
        output_path = "verification/homepage_styles.png"
        page.screenshot(path=output_path, full_page=False)
        print(f"Screenshot saved to {output_path}")

        browser.close()

if __name__ == "__main__":
    verify_styles()
