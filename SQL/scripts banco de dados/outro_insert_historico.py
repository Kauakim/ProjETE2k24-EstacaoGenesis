import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='projete',
        password='12345',
        database='historico'
    )

# Função para inserir valores de teste na tabela
def insere_valores_teste():
    conexao = conecta_banco()
    cursor = conexao.cursor()

    # Query SQL para inserir valores de teste com data e hora de criação
    insert_sql = '''
        INSERT INTO main (
           usuario,
           senha,
           email,
           cidade,
           gemeo,
           estilo,
           data_criacao,
           hora_criacao
        ) 
        VALUES (
            %s, %s, %s, %s, %s, %s, CURDATE(), CURTIME()
        );
    '''
    
    # Valores de teste a serem inseridos (exemplo)
    valores_teste = [
        ('primeiro', '12345', 'teste@gmail.com', 'santa rita do sapucai', 1, 1)
    ]
    
    # Executa a inserção dos valores
    cursor.executemany(insert_sql, valores_teste)
    conexao.commit()

    # Fecha a conexão
    cursor.close()
    conexao.close()

# Chamar a função para inserir valores de teste
insere_valores_teste()
