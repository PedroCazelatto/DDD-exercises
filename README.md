# DDD-exercises

Exercícios sobre Domain-Driven Design

## Curso da RocketSeat: DDD no Node.js

Desenvolver um sistema de fórum de dúvidas

### Value Objects

Propriedades das entidade que possuem uma regra de negócio associada

## Conceitos

### Aggregate

Conjunto de entidades que são manipuladas ao mesmo tempo, quando uma não faz sentido existir sem a outra

- Order -> OrderItem[]
- Order -> Shipping

### WatchedList

Classe que permite termos mais informações sobre itens de uma lista, para que seja possível adicionar (create), apagar (delete) ou atualizar (update) de itens existentes em uma lista

# Subdomínios

- Core: O que dá dinheiro
- Supporting: Dá suporte para o core funcionar
- Generic: Você precisa deles mas não são tão importantes

## Exemplos

Para um e-commerce:

### Core:

- Compra
- Catálogo
- Pagamento
- Entrega
- Faturamento

### Supporting:

- Estoque

### Generics

- Notificação ao cliente
- Promoções
- Chat
