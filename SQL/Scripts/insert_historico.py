import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Chiovat@123',
        database='historico'
    )

# Função para inserir valores de teste na tabela
def insere_valores_teste():
    conexao = conecta_banco()
    cursor = conexao.cursor()

    # Query SQL para inserir valores de teste
    insert_sql = '''
        INSERT INTO main (
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
            Umidade_relativa_ar_max_hora_anteior, 
            Umidade_relativa_ar_min_hora_anterior, 
            Umidade_relativa_do_ar, 
            Direcao_horaria_vento_partir_norte, 
            Velocidade_rajada_vento, 
            Velocidade_horaria_vento, 
            Estacao
        ) 
        VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        );
    '''
    
    # Valores de teste a serem inseridos (exemplo)
    valores_teste = [
        ('2024-09-16', '12:00', 2.5, 1013.2, 1014.5, 1012.3, 300, 25.5, 18.2, 26.0, 24.0, 18.5, 17.9, 85, 65, 75, 180, 10, 5, 1)
    ]
    
    # Executa a inserção dos valores
    cursor.executemany(insert_sql, valores_teste)
    conexao.commit()

    # Fecha a conexão
    cursor.close()
    conexao.close()

# Chamar a função para inserir valores de teste
insere_valores_teste()
