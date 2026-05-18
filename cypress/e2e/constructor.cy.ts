describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');

    cy.get('body').then(($body) => {
      $body.find('iframe#webpack-dev-server-client-overlay').remove();
    });
  });

  it('Добавляет ингредиент в конструктор', () => {
    cy.contains('Добавить').first().click({ force: true });

    cy.get('[data-cy=constructor]').should('exist').and('not.be.empty');
  });
  

  it('Открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('Краторная булка N-200i').click({ force: true });

    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal]').should('contain', 'Краторная булка N-200i');

    cy.get('[data-cy=modal-close]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Создаёт заказ', () => {
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.setCookie('accessToken', 'test-access-token');

    cy.contains('Краторная булка N-200i')
      .parents('[data-cy=ingredient-card]')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Биокотлета из марсианской Магнолии')
      .parents('[data-cy=ingredient-card]')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Оформить заказ').click({ force: true });

    cy.wait('@createOrder');

    cy.get('[data-cy=modal]').should('exist');
    cy.contains('12345').should('exist');

    cy.get('[data-cy=modal-close]').click({ force: true });

    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]').should(
      'not.contain',
      'Краторная булка N-200i'
    );

    cy.get('[data-cy=constructor]').should(
      'not.contain',
      'Биокотлета из марсианской Магнолии'
    );
  });
});