/// <reference types="cypress"/>

import produtosPage from "../support/page_objects/produtos.page";

const perfil = require("../fixtures/perfil.json")
const { faker, PhoneModule } = require('@faker-js/faker');

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      cy.login(perfil.usuario, perfil.senha)
      produtosPage.visitarProdutos()

      cy.fixture('produtos').then((produtos) => {
        produtos.forEach((produtos) => {
            produtosPage.visitarProduto(produtos.nomeProduto)
            produtosPage.addProdutoCarrinho(produtos.tamanho, produtos.cor, produtos.quantidade);
        });
      });

      cy.get('.dropdown-toggle > .text-skin').click()

      cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

      produtosPage.preencherDetalhesFatura(
        faker.person.firstName(),
        faker.person.lastName(),
        "Brasil",
        faker.location.streetAddress(),
        "São Paulo",
        "São Paulo",
        faker.location.zipCode('#####-###'),
        faker.phone.number('(##)####-####'),
        perfil.usuario
      )

      cy.get('#terms').click()
      cy.get('#place_order').click()
      
      //cy.get('.woocommerce-notice').should('be.visible').should('contain', 'Obrigado. Seu pedido foi recebido.')

      cy.fixture('produtos').then((produtos) => {

        // Para cada produto no JSON
        produtos.forEach((produto) => {
            const nomeProdutoComVariacoes = `${produto.nomeProduto} - ${produto.tamanho}, ${produto.cor}`;
            
            // Selecionar o elemento do produto na tabela
            cy.get('table.woocommerce-table tbody .woocommerce-table__product-name a')
              .should('contain', nomeProdutoComVariacoes); 
            
            
            const quantidadeEsperada = `${produto.quantidade}`;
            cy.get('table.woocommerce-table tbody .woocommerce-table__product-name strong.product-quantity')
              .should('contain', quantidadeEsperada);
        });
    });
  });
})