import re
from playwright.sync_api import Page, expect

BASE_URL = "http://localhost:3000"

def test_full_user_flow(page: Page):
    """
    Tests the full user flow from adding a product to the cart to checkout.
    """
    # 1. Go to the homepage
    page.goto(BASE_URL)
    expect(page).to_have_title(re.compile("Bati-Duoc"))

    # 2. Add a product to the cart from a category
    page.get_by_role("link", name="Categorias").click()
    page.get_by_role("link", name="Batidos").click()
    expect(page).to_have_url(re.compile("/categoria/batidos"))

    # Click on the first product card to add it
    page.locator(".card-img-top").first.click()
    page.get_by_role("button", name="Agregar al Carrito").click()

    # Check if the cart shows 1 item
    expect(page.locator("#cart-count")).to_have_text("1")

    # 3. Go to login page
    page.get_by_role("link", name="Iniciar Sesión").click()
    expect(page).to_have_url(f"{BASE_URL}/inicio-sesion")

    # 4. Fill login form and submit
    page.get_by_label("Correo Electrónico").fill("test@example.com")
    page.get_by_label("Contraseña").fill("password123")
    page.get_by_role("button", name="Iniciar Sesión").click()

    # After login, we should be redirected or see the user's name
    expect(page.get_by_text("Bienvenido")).to_be_visible()

    # 5. Go to checkout
    page.get_by_role("link", name="Carrito").click()
    page.get_by_role("link", name="Ir a Pagar").click()
    expect(page).to_have_url(f"{BASE_URL}/checkout")

    # 6. Process payment
    page.get_by_role("button", name=re.compile("Pagar ahora")).click()

    # 7. Verify payment result
    # Wait for either the success or failure page to load
    page.wait_for_url(re.compile("(/pago-exitoso|/pago-fallido)"))

    if "pago-exitoso" in page.url:
        expect(page.get_by_text("Se ha realizado la compra")).to_be_visible()
        # Optional: Test download
        # with page.expect_download() as download_info:
        #     page.get_by_role("button", name="Descargar Boleta (.txt)").click()
        # download = download_info.value
        # assert download.suggested_filename.endswith('.txt')
    else:
        expect(page.get_by_text("No se pudo realizar el pago")).to_be_visible()
        page.get_by_role("button", name="VOLVER A REALIZAR EL PAGO").click()
        expect(page).to_have_url(f"{BASE_URL}/checkout")

