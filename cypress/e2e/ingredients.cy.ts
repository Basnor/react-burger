describe("burger ingredients", () => {
  beforeEach(function () {
    cy.viewport(1920, 1024);
    cy.visit("/");
  });

  it("should title be available", function () {
    cy.contains("Соберите бургер");
  });

  describe("ingredient modal", () => {
    beforeEach(function () {
      cy.get(".burger-ingredients_item__JizN0").first().click();
    });

    it("should open ingredient details", function () {
      cy.contains("Детали ингредиента");

      cy.get('.modal_modal__4TXNT').contains("Краторная булка N-200i");
      cy.get('.modal_modal__4TXNT').contains("Калории");
      cy.get('.modal_modal__4TXNT').contains("420");
      cy.get('.modal_modal__4TXNT').contains("Белки");
      cy.get('.modal_modal__4TXNT').contains("80");
      cy.get('.modal_modal__4TXNT').contains("Жиры");
      cy.get('.modal_modal__4TXNT').contains("24");
      cy.get('.modal_modal__4TXNT').contains("Углеводы");
      cy.get('.modal_modal__4TXNT').contains("53");
    });

    it("should close ingredient details by button", function () {
      cy.get(".modal_closeButton__DsCEZ > svg").click();
      cy.get(".modal_modal__4TXNT").should("not.exist");
    });

    it("should close ingredient details by esc", () => {
      cy.get("body").type("{esc}");
      cy.get(".modal_modal__4TXNT").should("not.exist");
    });
  });

  describe("load ingredients", () => {
    it("should contain list of ingredients", () => {
      cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", (req) => {
        req.reply({
          statusCode: 200,
          fixture: "ingredients.json",
        });
      }).as("getIngredients");

      cy.wait("@getIngredients");

      const ingredientNames: string[] = [];

      cy.get(".burger-ingredients_item__JizN0").each(($ingredient) => {
        const name = $ingredient.find(".text_type_main-default").text().trim();
        ingredientNames.push(name);
      });

      cy.get(".burger-ingredients_wrapper__zjmOM").then(() => {
        expect(ingredientNames).to.include.members([
          "Краторная булка N-200i",
          "Биокотлета из марсианской Магнолии",
          "Филе Люминесцентного тетраодонтимформа",
          "Соус Spicy-X",
          "Соус фирменный Space Sauce",
          "Мясо бессмертных моллюсков Protostomia",
          "Говяжий метеорит (отбивная)",
          "Флюоресцентная булка R2-D3",
          "Соус традиционный галактический",
          "Соус с шипами Антарианского плоскоходца",
          "Хрустящие минеральные кольца",
          "Плоды Фалленианского дерева",
          "Кристаллы марсианских альфа-сахаридов",
          "Мини-салат Экзо-Плантаго",
          "Сыр с астероидной плесенью",
        ]);
      });
    });
  });
});
