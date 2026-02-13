import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='projete',
        password='12345',
        database='previsao'
    )

def LerStatus():
    conexao = conecta_banco()
    cursor = conexao.cursor()

    # Query SQL para selecionar o status da estação MG-01
    query = '''
    SELECT status FROM sensores
    WHERE Estacao = 'MG-01'
    LIMIT 1
    '''

    # Executa a consulta
    cursor.execute(query)

    # Pega o resultado da consulta
    resultado = cursor.fetchone()

    print(f"Status: {resultado[0]}")
    
    # Fecha a conexão
    cursor.close()
    conexao.close()

def TrocarStatus():
    conexao = conecta_banco()
    cursor = conexao.cursor()

    update_sql = '''
    UPDATE sensores
    SET status = 0
    WHERE Estacao = 'MG-01'
    LIMIT 1
    '''

    # Executa a atualização
    cursor.execute(update_sql)
    conexao.commit()

    # Fecha a conexão
    cursor.close()
    conexao.close()

# Executa as funções
LerStatus()
TrocarStatus()
LerStatus()