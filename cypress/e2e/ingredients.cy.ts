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
      cy.get('[class^="burger-ingredients_item"]').first().click();
    });

    it("should open ingredient details", function () {
      cy.contains("Детали ингредиента");

      const modal = '[class^="modal_modal"]';

      cy.get(modal).contains("Краторная булка N-200i");
      cy.get(modal).contains("Калории");
      cy.get(modal).contains("Белки");
      cy.get(modal).contains("80");
      cy.get(modal).contains("Жиры");
      cy.get(modal).contains("24");
      cy.get(modal).contains("420");
      cy.get(modal).contains("Углеводы");
      cy.get(modal).contains("53");
    });

    it("should close ingredient details by button", function () {
      cy.get('[class^="modal_closeButton"] > svg').click();
      cy.get('[class^="modal_modal"]').should("not.exist");
    });

    it("should close ingredient details by esc", () => {
      cy.get("body").type("{esc}");
      cy.get('[class^="modal_modal"]').should("not.exist");
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

      cy.get('[class^="burger-ingredients_item"]').each(($ingredient) => {
        const name = $ingredient.find(".text_type_main-default").text().trim();
        ingredientNames.push(name);
      });

      cy.get('[class^="burger-ingredients_wrapper"]').then(() => {
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
