import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Chiovat@123',
        database='previsão'
    )

# Função para zerar as últimas 23 linhas
def zera_ultimas_23_linhas():
    conexao = conecta_banco()
    cursor = conexao.cursor()
    
    # Query para selecionar as últimas 23 linhas (baseado no ID ou Data + Hora)
    consulta_sql = '''
        SELECT id FROM sensores
        ORDER BY Data DESC, Hora DESC
        LIMIT 23;
    '''
    
    # Executa a consulta para pegar os IDs das últimas 23 linhas
    cursor.execute(consulta_sql)
    ids = cursor.fetchall()

    # Cria uma lista de IDs das últimas 23 linhas
    ids_list = [str(row[0]) for row in ids]
    
    if ids_list:
        # Query SQL para zerar as colunas nas últimas 23 linhas
        update_sql = f'''
            UPDATE sensores
            SET 
                Precipitacao_horario_total_mm = 0,
                PA_horaria_nivel_estacao = 0,
                PA_max_hora_anterior = 0,
                PA_min_hora_anterior = 0,
                Radiacao_global = 0,
                Temp_ar = 0,
                Temp_ponto_orvalho = 0,
                Temp_max_hora_anterior = 0,
                Temp_min_hora_anterior = 0,
                Temp_ponto_orvalho_max_hora_anterior = 0,
                Temp_ponto_orvalho_min_hora_anterior = 0,
                Umidade_relativa_ar_max_hora_anterior = 0,
                Umidade_relativa_ar_min_hora_anterior = 0,
                Umidade_relativa_do_ar = 0,
                Direcao_horaria_vento_partir_norte = 0,
                Velocidade_rajada_vento = 0,
                Velocidade_horaria_vento = 0,
                Estacao = 0
            WHERE id IN ({','.join(ids_list)});
        '''
        
        # Executa a query de atualização
        cursor.execute(update_sql)
        conexao.commit()

    # Fecha a conexão
    cursor.close()
    conexao.close()

# Chamar a função para zerar as últimas 23 linhas
zera_ultimas_23_linhas()
