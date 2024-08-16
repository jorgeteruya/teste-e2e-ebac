class ProdutosPage{

    visitarProdutos(){
        cy.visit('produtos/')
    }

    buscarProduto(nomeProduto){
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    buscarProdutoLista(nomeProduto){
        cy.get('.products > .row')
            .contains(nomeProduto)
            .click()
    }

    visitarProduto(nomeProduto){
        const urlFormatada = nomeProduto.replace(/ /g, '-')
        cy.visit(`produtos/${urlFormatada}`)
    }

    addProdutoCarrinho(tamanho, cor, quantidade){
        cy.wait(100)
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }

    preencherDetalhesFatura(nome, sobrenome, pais, endereco, cidade, estado, cep, telefone, email){
        cy.get('#billing_first_name').clear().type(nome)
        cy.get('#billing_last_name').clear().type(sobrenome)
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-results__option').contains(pais).click()
        cy.get('#billing_address_1').clear().type(endereco)
        cy.get('#billing_city').clear().type(cidade)
        cy.get('.select2-selection[aria-label="Estado"]').click()
        cy.get('.select2-results__option').contains(estado).click()
        cy.get('#billing_postcode').clear().type(cep)
        cy.get('#billing_phone').clear().type(telefone)
        cy.get('#billing_email').clear().type(email)

    }
    
}

export default new ProdutosPage()