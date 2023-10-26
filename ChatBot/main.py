
import telebot
from telebot.types import ReplyKeyboardMarkup, KeyboardButton
from connection import Connection


bot_token: str = "1593798070:AAH7wU1lahSNpjv70VQ3bMhlK5UhFq1OhUw"
bot = telebot.TeleBot(token=bot_token)

cart: dict[str, int] = {}
selected_product: str = ""
selected_local: str = ""
already_selected_local: bool = False

database: Connection = Connection()


def select_menu() -> ReplyKeyboardMarkup:
    """
    Creates a keyboard with the menu options available to select

    Parameters:
        - No parameters

    Returns:
        - keyboard: ReplyKeyboardMarkup
    """

    keyboard: ReplyKeyboardMarkup = ReplyKeyboardMarkup(row_width = 2)
    locals_button: KeyboardButton = KeyboardButton(text = "Negocios asociados")
    order_button: KeyboardButton = KeyboardButton(text = "Hacer pedido")
    keyboard.add(locals_button, order_button)

    return keyboard


def display_locals() -> str:
    """
    Displays the locals registered in the database

    Parameters:
        - No parameters

    Returns:
        - locals_str: str
    """

    locals: list[str] = database.get_locals()

    locals_str: str = "Estos son los negocios asociados:\n"
    for local in locals:
        locals_str += f"- {local}\n"

    return locals_str


def select_local() -> ReplyKeyboardMarkup:
    """
    Creates a keyboard with the locals available to select

    Parameters:
        - No parameters

    Returns:
        - keyboard: ReplyKeyboardMarkup
    """

    locals: list[str] = database.get_locals()

    # Creates a keyboard with the locals available to select, grouped in rows of 2 buttons each.
    # If the number of locals is odd, the last row will have only one button
    keyboard: ReplyKeyboardMarkup = ReplyKeyboardMarkup(row_width = 2)
    for local in range(0, len(locals), 2):
        try:
            button1: KeyboardButton = KeyboardButton(text = locals[local])
            button2: KeyboardButton = KeyboardButton(text = locals[local + 1])
            keyboard.add(button1, button2)
        except IndexError:
            button: KeyboardButton = KeyboardButton(text = locals[local])
            keyboard.add(button)

    return keyboard


def select_product(local: str) -> ReplyKeyboardMarkup:
    """
    Creates a keyboard with the products available to select

    Parameters:
        - local: str

    Returns:
        - keyboard: ReplyKeyboardMarkup
    """

    products: dict[str, int] = database.get_products(selected_local)

    # Creates a keyboard with the products available to select, grouped in rows of 2 buttons each.
    # If the number of products is odd, the last row will have only one button
    keyboard: ReplyKeyboardMarkup = ReplyKeyboardMarkup(row_width = 2)
    local_products: list[str] = list(products.keys())
    for product_idx in range(0, len(local_products), 2):
        try:
            button1: KeyboardButton = KeyboardButton(text = local_products[product_idx])
            button2: KeyboardButton = KeyboardButton(text = local_products[product_idx + 1])
            keyboard.add(button1, button2)
        except IndexError:
            button: KeyboardButton = KeyboardButton(text = local_products[product_idx])
            keyboard.add(button)

    # Adds the cancel and cart buttons to the keyboard with an emoji icon each one
    cancel_button: KeyboardButton = KeyboardButton(text = "❌ Cancelar")
    cart_button: KeyboardButton = KeyboardButton(text = "🛒 Carrito")
    keyboard.add(cancel_button, cart_button)

    return keyboard


def display_cart() -> str:
    """
    Displays the cart content

    Parameters:
        - No parameters

    Returns:
        - cart_str: str
    """

    products: dict[str, int] = database.get_products(selected_local)

    total: int = 0
    cart_str: str = "Este es tu carrito:\n\n"
    for product, quantity in cart.items():
        # Calculates the subtotal for each product and adds it to the total
        subtotal: int = products[product] * int(quantity)
        cart_str += f"- {quantity} X {product}\t\t${subtotal}\n"
        total += subtotal

    cart_str += f"\nTotal: ${total}"

    return cart_str


def select_pay() -> ReplyKeyboardMarkup:
    """
    After the user selects the cart button, the bot will ask the user to pay
    or return to the product selection

    Parameters:
        - No parameters

    Returns:
        - keyboard: ReplyKeyboardMarkup
    """

    keyboard: ReplyKeyboardMarkup = ReplyKeyboardMarkup(row_width = 2)
    pay_button: KeyboardButton = KeyboardButton(text = "💵 Pagar")
    product_selection_button: KeyboardButton = KeyboardButton(text = "🏪 Regresar a la tienda")
    keyboard.add(pay_button, product_selection_button)

    return keyboard


@bot.message_handler()
def welcome(message) -> None:
    """
    Welcomes the user and asks the user to select an option from the menu

    Parameters:
        - message: Message
    
    Returns:
        - No return value
    """

    global already_selected_local, selected_local, selected_product

    # Resets the already_selected_local flag to False, clears the cart dictionary,
    # the selected_local and selected_product variables
    already_selected_local = False
    selected_local = ""
    selected_product = ""
    cart.clear()

    reply: str = "¡Hola, buen día! ¿en qué te puedo ayudar?"
    keyboard: ReplyKeyboardMarkup = select_menu()
    bot.send_message(message.chat.id, reply, reply_markup = keyboard)
    # Moves to next step -> Menu selection
    bot.register_next_step_handler(message, main_menu)


def main_menu(message) -> None:
    """
    Asks the user to select an option from the menu

    Parameters:
        - message: Message

    Returns:
        - No return value
    """

    selection: str = message.text

    # If the user selects "Negocios asociados", the bot will send a message with the locals
    # registered in the database
    if selection == "Negocios asociados":
        reply: str = display_locals()
        bot.send_message(message.chat.id, reply)
        # Returns to the previous step -> Menu selection
        bot.register_next_step_handler(message, main_menu)

    # If the user selects "Hacer pedido", the bot will ask the user to select a local.
    # Local selection is done in this step
    elif selection == "Hacer pedido":
        reply: str = "Selecciona un negocio para hacer un pedido"
        keyboard: ReplyKeyboardMarkup = select_local()
        bot.send_message(message.chat.id, reply, reply_markup = keyboard)
        # Moves to the next step -> Product selection
        bot.register_next_step_handler(message, product_selection)

    # If the user inputs something else, the bot will ask the user to select an option from the menu
    else:
        bot.send_message(message.chat.id, "No te entiendo, por favor usa los botones")
        # Returns to the previous step -> Menu selection
        bot.register_next_step_handler(message, main_menu)


def product_selection(message) -> None:
    """
    After the user selects a local, the bot will ask the user to select a product

    Parameters:
        - message: Message

    Returns:
        - No return value
    """

    global selected_local, already_selected_local

    # Saves the selected local in a global variable, and sets the
    # already_selected_local flag to True
    if not already_selected_local:
        selected_local = message.text
        already_selected_local = True

    reply: str = "Selecciona un producto"
    keyboard: ReplyKeyboardMarkup = select_product(selected_local)
    bot.send_message(message.chat.id, reply, reply_markup = keyboard)

    # Moves to the next step -> Product quantity selection
    bot.register_next_step_handler(message, product_quantity_selection)


def product_quantity_selection(message) -> None:
    """
    After the user selects a product, the bot will ask the user to input the quantity
    as a message

    Parameters:
        - message: Message

    Returns:
        - No return value
    """

    # Saves the selected product in a global variable
    global selected_product
    selected_product = message.text

    # If the user selects the cancel button, the bot will send a message
    # and return to the main menu
    if selected_product == "❌ Cancelar":
        reply: str = "Pedido cancelado"
        bot.send_message(message.chat.id, reply)
        # Returns to the previous step -> Menu selection
        welcome(message)
    
    elif selected_product == "🛒 Carrito":
        # If the user selects the cart button, the bot will send a message
        # with the cart content
        reply: str = display_cart()
        keyboard: ReplyKeyboardMarkup = select_pay()
        bot.send_message(message.chat.id, reply, reply_markup = keyboard)
        # Returns to the previous step -> Product selection
        bot.register_next_step_handler(message, pay)

    else:
        # Adds the product to the cart dictionary
        cart[selected_product] = 0

        reply: str = "¿Cuántos productos deseas? Por favor, escribe un número y envíalo"
        bot.send_message(message.chat.id, reply)
        # Moves to the next step -> Add to cart
        bot.register_next_step_handler(message, add_to_cart)


def add_to_cart(message) -> None:
    """
    After the user inputs the quantity, the bot will add the products to the cart,
    then it will ask the user if he/she wants to add another product

    Parameters:
        - message: Message
    
    Returns:
        - No return value
    """

    try:
        quantity: int = int(message.text)
        cart[selected_product] += quantity

        reply: str = "Producto agregado al carrito.\n¿Deseas agregar otro producto?"
        bot.send_message(message.chat.id, reply)
        # Returns to the previous step -> Product selection
        bot.register_next_step_handler(message, product_quantity_selection)
    
    except ValueError:
        bot.send_message(message.chat.id, "No te entiendo, por favor escribe un número")
        # Returns to the previous step -> Add to cart
        bot.register_next_step_handler(message, add_to_cart)


def pay(message) -> None:
    """
    After the user selects the cart button, the bot will ask the user to pay

    Parameters:
        - message: Message

    Returns:
        - No return value
    """

    selection: str = message.text

    if selection == "💵 Pagar":
        reply: str = "Por favor, escribe tu nombre y tu dirección de la siguiente manera:\nPrimer_nombre Dirección"
        bot.send_message(message.chat.id, reply)
        bot.register_next_step_handler(message, checkout)

    elif selection == "🏪 Regresar a la tienda":
        reply: str = "Regresarás al local"
        bot.send_message(message.chat.id, reply)
        product_selection(message)

    else:
        bot.send_message(message.chat.id, "No te entiendo, por favor usa los botones")
        # Returns to the previous step -> Menu selection
        bot.register_next_step_handler(message, pay)


def checkout(message) -> None:
    """
    After the user inputs his/her name, the bot will confirm the order

    Parameters:
        - message: Message

    Returns:
        - No return value
    """

    name: str = message.text[0: message.text.find(" ")]
    address: str = message.text[message.text.find(" "):]

    reply: str = f"Gracias por tu compra {name}\nEn un momento recibirás tu pedido"
    database.send_order(cart, selected_local, name, address)
    bot.send_message(message.chat.id, reply)
    welcome(message)


bot.polling()