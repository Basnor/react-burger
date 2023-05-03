describe("burger constructor", () => {
  beforeEach(function () {
    cy.viewport(1920, 1024);
    cy.visit("/");
  });

  describe("drag ingredient into constructor", () => {
    it("should drag bun", () => {
      cy.get(".burger-constructor_empty__DWOcZ").contains("Перетащи сюда!");
      cy.get(".constructor-element_pos_top").should("not.exist");
      cy.get(".constructor-element_pos_bottom").should("not.exist");
      cy.get(".burger-constructor_pricing__HkT-- > .text").should("not.exist");

      cy.contains(".burger-ingredients_item__JizN0", "Краторная булка N-200i").trigger("dragstart");
      cy.get(".burger-constructor_empty__DWOcZ").contains("Перетащи сюда!");
      cy.get(".burger-constructor_wrapper__hEXq5").trigger("drop");

      cy.get(".burger-constructor_empty__DWOcZ").should("not.exist");
      cy.get(".constructor-element_pos_top").contains("Краторная булка N-200i (верх)");
      cy.get(".constructor-element_pos_bottom").contains("Краторная булка N-200i (низ)");
      cy.get(".burger-constructor_pricing__HkT-- > .text").then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("0");
      });
      cy.wait(1000);
      cy.get(".burger-constructor_pricing__HkT-- > .text").then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("2510");
      });
    });

    it("should drag topping", () => {
      cy.get(".burger-constructor_empty__DWOcZ").contains("Перетащи сюда!");
      cy.get(".constructor-element_pos_top").should("not.exist");
      cy.get(".constructor-element_pos_bottom").should("not.exist");
      cy.get(".burger-constructor_pricing__HkT-- > .text").should("not.exist");

      cy.contains(".burger-ingredients_item__JizN0", "Мясо бессмертных моллюсков Protostomia").trigger("dragstart");
      cy.get(".burger-constructor_wrapper__hEXq5").trigger("drop");

      cy.get(".burger-constructor_empty__DWOcZ").should("not.exist");
      cy.get(".burger-constructor_topping__ueEuY").contains("Мясо бессмертных моллюсков Protostomia");
      cy.get(".burger-constructor_pricing__HkT-- > .text").then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("0");
      });
      cy.wait(1000);
      cy.get(".burger-constructor_pricing__HkT-- > .text").then(($totlaCost) => {
        const totlaCost = $totlaCost.text().trim();
        expect(totlaCost).eq("1337");
      });
    });
  });

  describe("create order", () => {
    beforeEach(function () {
      const email = "anastasiya@anastasiya.com";
      const password = "anastasiya";

      cy.visit("/login");
      cy.get("input").first().type(email);
      cy.get("input").last().type(password);
      cy.get(".login_form__57CYN > .button").click();
    });

    it("should made order", () => {
      cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", (req) => {
        req.reply({
          statusCode: 200,
          fixture: "create-order.json",
        });
      }).as("createOrder");

      cy.contains(".burger-ingredients_item__JizN0", "Биокотлета из марсианской Магнолии").as("topping1");
      cy.contains(".burger-ingredients_item__JizN0", "Хрустящие минеральные кольца").as("topping2");
      cy.contains(".burger-ingredients_item__JizN0", "Соус фирменный Space Sauce").as("topping3");
      cy.contains(".burger-ingredients_item__JizN0", "Краторная булка N-200i").as("bun");
      cy.get(".burger-constructor_wrapper__hEXq5").as("dropZone");

      cy.get(".burger-constructor_empty__DWOcZ").contains("Перетащи сюда!");
      cy.get(".constructor-element_pos_top").should("not.exist");
      cy.get(".constructor-element_pos_bottom").should("not.exist");
      cy.get(".burger-constructor_pricing__HkT-- > .text").should("not.exist");

      cy.get("@topping1").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@topping2").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@topping3").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");
      cy.get("@bun").trigger("dragstart");
      cy.get("@dropZone").trigger("drop");

      cy.get(".burger-constructor_pricing__HkT-- > .button").click();
      cy.wait("@createOrder");

      cy.get(".create-order_wrapper__JU8oQ").as("modal");

      cy.get("@modal").find(".create-order_number__c4W3q").contains("2876");
      cy.get("@modal").find(".mt-15").contains("Ваш заказ начали готовить");

      cy.get(".modal_closeButton__DsCEZ > svg").click();
      cy.get("@modal").should("not.exist");
    });
  });
});
