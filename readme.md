# Desafio Técnico - Expenses Tracker

O **Expenses Tracker** é uma aplicação de linha de comando (CLI) desenvolvida em Node.js para gerenciar finanças pessoais. Ele permite que os usuários adicionem, atualizem, excluam e visualizem despesas, além de fornecer resumos financeiros e funcionalidades avançadas, como categorização de despesas, definição de orçamentos mensais e exportação de dados para CSV.

### URL do desafio: https://roadmap.sh/projects/expense-tracker
---

## Tecnologias Utilizadas

-   **Node.js**: Ambiente de execução JavaScript para construir a aplicação.
-   **Commander**: Biblioteca para criar interfaces de linha de comando (CLI).
-   **csv-writer**: Biblioteca para gerar arquivos CSV a partir dos dados das despesas.
-   **File System (fs)**: Módulo nativo do Node.js para manipulação de arquivos.

---

## Como Executar o Projeto

1. **Pré-requisitos**:

    - Node.js instalado (versão 14 ou superior).
    - NPM (gerenciador de pacotes do Node.js).

2. **Instalação**:

    - Clone o repositório do projeto.
    - Navegue até o diretório do projeto:
        ```bash
        cd expense-tracker
        ```
    - Instale as dependências:
        ```bash
        npm install
        ```

3. **Execução**:
    - Execute o projeto usando o comando `node cli.js` seguido do comando desejado. Exemplo:
        ```bash
        node cli.js add --descricao "Almoço" --valor 25 --categoria "Alimentação"
        ```

---

## Comandos Disponíveis

Aqui estão todos os comandos suportados, com exemplos de uso e saídas esperadas.

### 1. Adicionar uma Despesa

Adiciona uma nova despesa com descrição, valor e categoria (opcional).

-   **Comando**:
    ```bash
    node cli.js add --descricao <descrição> --valor <valor> [--categoria <categoria>]
    ```
-   **Exemplo**:
    ```bash
    node cli.js add --descricao "Almoço" --valor 25 --categoria "Alimentação"
    ```
-   **Saída**:
    ```
    Expense added successfully.
    ```

---

### 2. Atualizar uma Despesa

Atualiza uma despesa existente com base no ID.

-   **Comando**:
    ```bash
    node cli.js update --id <id> [--descricao <nova_descrição>] [--valor <novo_valor>] [--categoria <nova_categoria>]
    ```
-   **Exemplo**:
    ```bash
    node cli.js update --id 1 --valor 30
    ```
-   **Saída**:
    ```
    Expense updated successfully.
    ```

---

### 3. Remover uma Despesa

Remove uma despesa com base no ID.

-   **Comando**:
    ```bash
    node cli.js delete --id <id>
    ```
-   **Exemplo**:
    ```bash
    node cli.js delete --id 1
    ```
-   **Saída**:
    ```
    Expense deleted successfully.
    ```

---

### 4. Listar Despesas

Lista todas as despesas ou filtra por categoria.

-   **Comando**:
    ```bash
    node cli.js list [--categoria <categoria>]
    ```
-   **Exemplo** (listar todas):
    ```bash
    node cli.js list
    ```
-   **Saída**:
    ```
    ID  Data       Descrição     Valor    Categoria
    1   2024-08-06 Almoço        $25.00   Alimentação
    2   2024-08-06 Transporte    $10.00   Transporte
    ```
-   **Exemplo** (filtrar por categoria):
    ```bash
    node cli.js list --categoria "Alimentação"
    ```
-   **Saída**:
    ```
    ID  Data       Descrição     Valor    Categoria
    1   2024-08-06 Almoço        $25.00   Alimentação
    ```

---

### 5. Resumo das Despesas

Exibe o total de despesas (geral ou por mês).

-   **Comando**:
    ```bash
    node cli.js summary [--mes <number>]
    ```
-   **Exemplo** (resumo geral):
    ```bash
    node cli.js summary
    ```
-   **Saída**:
    ```
    Total de despesas: $35.00
    ```
-   **Exemplo** (resumo por mês):
    ```bash
    node cli.js summary --mes 8
    ```
-   **Saída**:
    ```
    Total de despesas para Agosto: $35.00
    ```

---

### 6. Definir Orçamento Mensal

Define um orçamento para um mês específico.

-   **Comando**:
    ```bash
    node cli.js set-budget --mes <mês> --valor <valor>
    ```
-   **Exemplo**:
    ```bash
    node cli.js set-budget --mes 8 --valor 1000
    ```
-   **Saída**:
    ```
    Orçamento para o mês 8 definido como $1000.00
    ```

---

### 7. Exportar Despesas para CSV

Exporta todas as despesas para um arquivo CSV.

-   **Comando**:
    ```bash
    node cli.js export
    ```
-   **Saída**:
    ```
    Expenses exported to CSV successfully.
    ```

---

## Como Contribuir

Se você deseja contribuir com o projeto, siga estas etapas:

1. **Faça um Fork** do repositório.
2. **Clone o repositório** forkado para sua máquina local:
    ```bash
    git clone https://github.com/herloncosta/expense-tracker.git
    ```
3. **Crie uma branch** para sua feature ou correção:
    ```bash
    git checkout -b minha-feature
    ```
4. **Faça as alterações** e commit:
    ```bash
    git commit -m "Adicionando nova funcionalidade"
    ```
5. **Envie as alterações** para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
6. **Abra um Pull Request** no repositório original.

---

## Licença

Este projeto é open-source e está licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para usar, modificar e distribuir o código.

---

## Contato

Se tiver dúvidas ou sugestões, entre em contato:

-   **E-mail**: herlon36@gmail.com

---

Obrigado por usar e contribuir com o **Expenses Tracker**! 🚀
