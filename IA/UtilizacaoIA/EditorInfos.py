import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='projete',
        password='12345',
        database='previsao'
    )

# Função para inserir valores de teste na tabela
def insere_valores_teste():
    conexao = conecta_banco()
    cursor = conexao.cursor()

    # Query SQL para inserir valores de teste
    insert_sql = '''
        INSERT INTO sensores (
            Data, 
            Hora, 
            Precipitacao_horario_total_mm, 
            PA_horaria_nivel_estacao, 
            PA_max_hora_anterior, 
            PA_min_hora_anterior, 
            Radiacao_global, 
            Temp_ar, 
            Temp_ponto_orvalho, 
            Temp_max_hora_anterior, 
            Temp_min_hora_anterior, 
            Temp_ponto_orvalho_max_hora_anterior, 
            Temp_ponto_orvalho_min_hora_anterior, 
            Umidade_relativa_ar_max_hora_anterior, 
            Umidade_relativa_ar_min_hora_anterior, 
            Umidade_relativa_do_ar, 
            Direcao_horaria_vento_partir_norte, 
            Velocidade_rajada_vento, 
            Velocidade_horaria_vento, 
            Estacao,
            status
        ) 
        VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        );
    '''
    
    # Valores de teste a serem inseridos (exemplo)
    valores_teste = [
        ('2000-01-01', '00:00:00', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'MG-01', 0),
    ]
    
    # Executa a inserção dos valores
    cursor.executemany(insert_sql, valores_teste)
    conexao.commit()

    # Fecha a conexão
    cursor.close()
    conexao.close()

# Chamar a função para inserir valores de teste
insere_valores_teste()