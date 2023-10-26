
from mysql.connector import connect, MySQLConnection
from mysql.connector.cursor import MySQLCursor


class Connection:
    """
    Connection class for the ChatBot to MySQL database
    """

    def __init__(self) -> None:
        # Private attributes
        self.__order_db: MySQLConnection = connect(
            host = "localhost",
            user = "root",
            password = "Erick2004",
            database = "pedidos"
        )
        self.__locals_db: MySQLConnection = connect(
            host = "localhost",
            user = "root",
            password = "Erick2004",
            database = "negocios"
        )
        # Protected attributes
        self._order_cursor: MySQLCursor = self.__order_db.cursor()
        self._locals_cursor: MySQLCursor = self.__locals_db.cursor()


    def get_locals(self) -> list:
        """
        Get all the locals from the 'negocios' database

        Parameters:
            - No parameters

        Returns:
            - names_of_locals: list
        """

        self._locals_cursor.execute("SHOW TABLES")
        names_of_locals: list = self._locals_cursor.fetchall()

        # Format the names of the locals before returning them
        for local, _ in enumerate(names_of_locals):
            local_name: str = names_of_locals[local][0]
            local_name = local_name.replace("_", " ").capitalize()
            names_of_locals[local] = local_name

        return names_of_locals


    def get_products(self, local: str) -> dict[str, int]:
        """
        Get the products with their prices from the selected local

        Parameters:
            - local: str

        Returns:
            - product_dict: dict[str, int]
        """

        product_dict: dict[str, int] = {}

        # Format the local name before using it
        local: str = local.replace(" ",  "_").lower()
        self._locals_cursor.execute(f"SELECT * FROM {local}")
        products: tuple = self._locals_cursor.fetchall()

        for row in products:
            _, product, price = row
            product_dict[product] = price

        return product_dict


    def send_order(self, cart: dict[str, int], local: str, name: str, address: str) -> None:
        """
        Send the order to the 'pedidos' database

        Parameters:
            - cart: dict[str, int]
            - local: str
            - name: str
            - address: str

        Returns:
            - No return value
        """

        product_dict: dict[str, int] = self.get_products(local)

        product_str: str = ""
        total_sale: int = 0

        for product, quantity in cart.items():
            product_str += f"{quantity} X {product}, "
            total_sale += product_dict[product] * quantity

        substr_to_remove: str = product_str.rfind(", ")
        product_str = product_str[0: substr_to_remove]

        sql: str = "INSERT INTO pedidos (name, selected_local, products, sale, address) VALUES (%s, %s, %s, %s, %s)"
        values: str = (name, local, product_str, total_sale, address)

        self._order_cursor.execute(sql, values)
        self.__order_db.commit()
