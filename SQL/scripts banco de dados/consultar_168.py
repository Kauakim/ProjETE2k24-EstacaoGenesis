import pandas as pd
import mysql.connector

# Função para conectar ao banco de dados
def conecta_banco():
    return mysql.connector.connect(
        host='localhost',
        user='root',
        password='Chiovat@123',
        database='historico'
    )

# Função para consultar as últimas 168 linhas da tabela
def consulta_ultimas_linhas():
    conexao = conecta_banco()
    consulta_sql = '''
        SELECT 
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
        FROM main
        ORDER BY Data DESC, Hora DESC
        LIMIT 168;
    '''
    
    df = pd.read_sql(consulta_sql, conexao)
    conexao.close()
    return df

# Chamar a função e imprimir as últimas 168 linhas
dados = consulta_ultimas_linhas()
print(dados)
