describe("burger constructor", () => {
  beforeEach(function () {
    cy.viewport(1920, 1024);
    cy.visit("/");
  });

  const empty = '[class^="burger-constructor_empty"]';
  const pricingText = '[class^="burger-constructor_pricing"] > .text';
  const elementTop = ".constructor-element_pos_top";
  const elementBottom = ".constructor-element_pos_bottom";

  describe("drag ingredient into constructor", () => {
    it("should drag bun", () => {
      cy.get(empty).contains("Перетащи сюда!");
      cy.get(elementTop).should("not.exist");
      cy.get(elementBottom).should("not.exist");
      cy.get(pricingText).should("not.exist");

      cy.contains('[class^="burger-ingredients_item"]', "Краторная булка N-200i").trigger("dragstart");
      cy.get(empty).contains("Перетащи сюда!");
      cy.get('[class^="burger-constructor_wrapper"]').trigger("drop");

      cy.get(empty).should("not.exist");
      cy.get(elementTop).contains("Краторная булка N-200i (верх)");
      cy.get(elementBottom).contains("Краторная булка N-200i (низ)");
      cy.get(pricingText).then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("0");
      });
      cy.wait(1000);
      cy.get(pricingText).then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("2510");
      });
    });

    it("should drag topping", () => {
      cy.get(empty).contains("Перетащи сюда!");
      cy.get(elementTop).should("not.exist");
      cy.get(elementBottom).should("not.exist");
      cy.get(pricingText).should("not.exist");

      cy.contains('[class^="burger-ingredients_item"]', "Мясо бессмертных моллюсков Protostomia").trigger("dragstart");
      cy.get('[class^="burger-constructor_wrapper"]').trigger("drop");

      cy.get(empty).should("not.exist");
      cy.get('[class^="burger-constructor_topping"]').contains("Мясо бессмертных моллюсков Protostomia");
      cy.get(pricingText).then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("0");
      });
      cy.wait(1000);
      cy.get(pricingText).then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("1337");
      });
    });
  });

  describe("create order", () => {
    beforeEach(function () {
      const email = "anastasiya@anastasiya.com";
      const password = "anastasiya";

      cy.visit("/#/login");
      cy.get("input").first().type(email);
      cy.get("input").last().type(password);
      cy.get('[class^="login_form"] > .button').click();
    });

    it("should made order", () => {
      cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", (req) => {
        req.reply({
          statusCode: 200,
          fixture: "create-order.json",
        });
      }).as("createOrder");

      const item = '[class^="burger-ingredients_item"]';

      cy.contains(item, "Биокотлета из марсианской Магнолии").as("topping1");
      cy.contains(item, "Хрустящие минеральные кольца").as("topping2");
      cy.contains(item, "Соус фирменный Space Sauce").as("topping3");
      cy.contains(item, "Краторная булка N-200i").as("bun");
      cy.get('[class^="burger-constructor_wrapper"]').as("dropZone");

      cy.get(empty).contains("Перетащи сюда!");
      cy.get(elementTop).should("not.exist");
      cy.get(elementBottom).should("not.exist");
      cy.get(pricingText).should("not.exist");

      cy.get("@topping1").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@topping2").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@topping3").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@bun").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");

      cy.get('[class^="burger-constructor_pricing"] > .button').click();
      cy.wait("@createOrder");

      cy.get('[class^="create-order_wrapper"]').as("modal");

      cy.get("@modal").find('[class^="create-order_number"]').contains("2876");
      cy.get("@modal").find(".mt-15").contains("Ваш заказ начали готовить");

      cy.get('[class^="modal_closeButton"] > svg').click();
      cy.get("@modal").should("not.exist");
    });
  });
});
