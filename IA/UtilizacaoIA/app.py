# Bibliotecas de uso geral
import time
import pandas as pd
from datetime import datetime
import json
import os

# Biblioteca do SQL
import mysql.connector

# Biblioteca da IA
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from tensorflow.keras.models import load_model

from tensorflow.keras.layers import Dense, LSTM, Reshape, Dropout
from tensorflow.keras.regularizers import l1
from tensorflow.keras.callbacks import ModelCheckpoint
from tensorflow.keras.models import load_model
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.utils import plot_model

from kerastuner import HyperModel
from kerastuner.tuners import RandomSearch

print("Bibliotecas importadas")



# Conecta o código aos bancos de dados do projeto
ConexaoPrevisao = mysql.connector.connect(
    host="localhost",
    user="projete",
    password="12345",
    database="previsao"
)
ConexaoHistorico = mysql.connector.connect(
    host="localhost",
    user="projete",
    password="12345",
    database="historico"
)
# Cria um cursor para executar as consultas ao SQL
CursorPrevisao = ConexaoPrevisao.cursor()
CursorHistorico = ConexaoHistorico.cursor()
print("Conectado ao SQL")



# Importa o modelo treinado no Google Colab
load_path = "1DiaAdamIA.keras"
IA = load_model(load_path)
print("Modelo importado")



# Nome das colunas que devem ser coletadas do SQL
TodasAsColunas_SQL = ["Data", "Hora", "Precipitacao_horario_total_mm", "PA_horaria_nivel_estacao", "PA_max_hora_anterior", "PA_min_hora_anterior", "Radiacao_global", "Temp_ar", "Temp_ponto_orvalho", "Temp_max_hora_anterior", "Temp_min_hora_anterior", "Temp_ponto_orvalho_max_hora_anterior", "Temp_ponto_orvalho_min_hora_anterior", "Umidade_relativa_ar_max_hora_anterior", "Umidade_relativa_ar_min_hora_anterior", "Umidade_relativa_do_ar", "Direcao_horaria_vento_partir_norte", "Velocidade_rajada_vento", "Velocidade_horaria_vento", "Estacao"]
# Nome das colunas que serão utilizadas pela IA
TodasAsColunas = ["Precipitacao horario total (mm)","Pressao atmosferica horaria ao nivel da estacao (mB)","Pressao atmosferica maxima na hora anterior (mB)","Pressao atmosferica minima na hora anterior (mB)","Radiacao global (KJ/m2)","Temperatura do ar (C)","Temperatura do ponto de orvalho (C)","Temperatura maxima hora anterior (C)","Temperatura minima hora anterior (C)","Temperatura do ponto de orvalho maximo hora anterior (C)","Temperatura do ponto de orvalho minima hora anterior (C)","Umidade relativa do ar maxima hora anteior(%)","Umidade relativa do ar minima hora anterior (%)","Umidade relativa do ar (%)","Data (Segundos)","VentoX","VentoY","VentoRajadaX","VentoRajadaY"]


# Função responsável por inserir uma linha de valores na tabela "sensores" do SQL
def InsertLinePrevisao(Valores):
    Consulta = """
        INSERT INTO sensores (Data, Hora, Precipitacao_horario_total_mm, PA_horaria_nivel_estacao, PA_max_hora_anterior, PA_min_hora_anterior, Radiacao_global, Temp_ar, Temp_ponto_orvalho, Temp_max_hora_anterior, Temp_min_hora_anterior, Temp_ponto_orvalho_max_hora_anterior, Temp_ponto_orvalho_min_hora_anterior,  Umidade_relativa_ar_max_hora_anterior, Umidade_relativa_ar_min_hora_anterior, Umidade_relativa_do_ar, Direcao_horaria_vento_partir_norte, Velocidade_rajada_vento, Velocidade_horaria_vento, Estacao) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    CursorPrevisao.execute(Consulta, Valores)
    ConexaoPrevisao.commit()


# Função para converter os valores previstos pela IA, que estão no tipo float32, para float
def Convert(val):
    if isinstance(val, np.float32):
        return float(val)
    return val


EstacaoDesejada = 'MG-01'
HorasDesejadas = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

while True:
    # Coleta as 168 ultimas linhas da tabela "main", nas linhas onde a Estação escolhida é a 'MG-01' e a hora é XX:00
    Consulta168 = f"""
    SELECT Data, Hora, Precipitacao_horario_total_mm, PA_horaria_nivel_estacao, PA_max_hora_anterior, PA_min_hora_anterior, Radiacao_global, Temp_ar, Temp_ponto_orvalho, Temp_max_hora_anterior, Temp_min_hora_anterior, Temp_ponto_orvalho_max_hora_anterior, Temp_ponto_orvalho_min_hora_anterior, Umidade_relativa_ar_max_hora_anterior, Umidade_relativa_ar_min_hora_anterior, Umidade_relativa_do_ar, Direcao_horaria_vento_partir_norte, Velocidade_rajada_vento, Velocidade_horaria_vento, Estacao
    FROM main
    WHERE Estacao IN ('MG-01', 'MG-01\r')
    ORDER BY Data DESC, Hora DESC
    LIMIT 168;
    """

    CursorHistorico.execute(Consulta168)
    rows = CursorHistorico.fetchall()
    
    # Cria um dataframe com base nos valores das últimas 168 linhas da tabela
    DataframeDeUtilizacao = pd.DataFrame(rows, columns=TodasAsColunas_SQL)

    # Inverte a ordem das linhas do dataframe
    DataframeDeUtilizacao = DataframeDeUtilizacao.iloc[::-1].reset_index(drop=True)

    #Converte a coluna 'Hora' de "Dias HH:MM:SS" para "HH:MM"
    DataframeDeUtilizacao['Hora'] = DataframeDeUtilizacao['Hora'].apply(lambda x: f'{int(x.components.hours):02}:{int(x.components.minutes):02}')

    print("Dados do SQL coletados e organizados pelo Pandas: ")
    print(DataframeDeUtilizacao)

    # Descobre se a ultima linha desse dataframe corresponde ás 23:00
    Hora = DataframeDeUtilizacao.iloc[-1]['Hora']
    print(Hora)

    if Hora == "23:00":
        print("Dados coletados suficientes no banco de dados para que uma previsão seja realizada")
        
        # Coleta o valor de Status da tabela de "sensores"
        StatusQuerry = f"""
        SELECT status FROM sensores
        WHERE Estacao = 'MG-01'
        LIMIT 1
        """
        CursorPrevisao.execute(StatusQuerry) 
        Resultado = CursorPrevisao.fetchone()
        Status = Resultado[0]

        if Status == 0:
            print("A previsao ainda não foi realizada pelo modelo")
            # Converte os valores lidos na tabela "Historico", que estão no padão de coleta das informações, para o padrão aceito pela IA
            # Converte a coluna de data, que está em dias/meses/anos em segundos
            DataframeDeUtilizacao["Data"] = pd.to_datetime(DataframeDeUtilizacao["Data"], format='%Y-%m-%d')
            DataframeDeUtilizacao["Segundos 1"] = DataframeDeUtilizacao["Data"].map(pd.Timestamp.timestamp)
            # Converte a coluna de horas em segundos
            DataframeDeUtilizacao["Hora"] = pd.to_datetime(DataframeDeUtilizacao["Hora"], format='%H:%M')
            DataframeDeUtilizacao["Segundos 2"] = DataframeDeUtilizacao["Hora"].dt.hour * 3600 + DataframeDeUtilizacao["Hora"].dt.minute * 60
            # Cria uma nova coluna somando os segundos de data e hora
            DataframeDeUtilizacao["Data (Segundos)"] = DataframeDeUtilizacao["Segundos 1"] + DataframeDeUtilizacao["Segundos 2"]
            # Remove as colunas antigas de data e hora
            DataframeDeUtilizacao.drop(columns=['Estacao', 'Data', 'Hora', 'Segundos 1', 'Segundos 2'], inplace=True)

            # Converte as colunas de vento para vetores de vento
            # Deleta as colunas de velocidade do vento e as atribue as seguintes variáveis
            VelocidadeDoVento = DataframeDeUtilizacao.pop('Velocidade_horaria_vento').astype(float)
            VelocidadeRajadaDoVento = DataframeDeUtilizacao.pop('Velocidade_rajada_vento').astype(float)
            # Realiza a mesma operação para a angulação, porém convertendo a infromação para radianos
            DirecaoDoVentoRadianos = DataframeDeUtilizacao.pop('Direcao_horaria_vento_partir_norte').astype(float)*np.pi / 180
            # Calcula os valores de X e Y do vetor do vento
            DataframeDeUtilizacao['VentoX'] = VelocidadeDoVento*np.cos(DirecaoDoVentoRadianos)
            DataframeDeUtilizacao['VentoY'] = VelocidadeDoVento*np.sin(DirecaoDoVentoRadianos)
            # Calcula os valores de X e Y do vetor de rajada do vento
            DataframeDeUtilizacao['VentoRajadaX'] = VelocidadeRajadaDoVento*np.cos(DirecaoDoVentoRadianos)
            DataframeDeUtilizacao['VentoRajadaY'] = VelocidadeRajadaDoVento*np.sin(DirecaoDoVentoRadianos)
            print("Dataframe corrigido para o padrão aceito pela IA: ")
            print(DataframeDeUtilizacao)


            MapaTrocaColunas = {
                "Precipitacao_horario_total_mm": "Precipitacao horario total (mm)",
                "PA_horaria_nivel_estacao": "Pressao atmosferica horaria ao nivel da estacao (mB)",
                "PA_max_hora_anterior": "Pressao atmosferica maxima na hora anterior (mB)",
                "PA_min_hora_anterior": "Pressao atmosferica minima na hora anterior (mB)",
                "Radiacao_global": "Radiacao global (KJ/m2)",
                "Temp_ar": "Temperatura do ar (C)",
                "Temp_ponto_orvalho": "Temperatura do ponto de orvalho (C)",
                "Temp_max_hora_anterior": "Temperatura maxima hora anterior (C)",
                "Temp_min_hora_anterior": "Temperatura minima hora anterior (C)",
                "Temp_ponto_orvalho_max_hora_anterior": "Temperatura do ponto de orvalho maximo hora anterior (C)",
                "Temp_ponto_orvalho_min_hora_anterior": "Temperatura do ponto de orvalho minima hora anterior (C)",
                "Umidade_relativa_ar_max_hora_anterior": "Umidade relativa do ar maxima hora anteior(%)",
                "Umidade_relativa_ar_min_hora_anterior": "Umidade relativa do ar minima hora anterior (%)",
                "Umidade_relativa_do_ar": "Umidade relativa do ar (%)",
                "Data (Segundos)": "Data (Segundos)",
                "VentoX": "VentoX",
                "VentoY": "VentoY",
                "VentoRajadaX": "VentoRajadaX",
                "VentoRajadaY": "VentoRajadaY"
            }
            # Renomeando as colunas do DataFrame com base no mapeamento
            DataframeDeUtilizacao.rename(columns=MapaTrocaColunas, inplace=True)


            print("Nome das colunas do Dataframe corrigido para o padrão aceito pela IA: ")
            print(DataframeDeUtilizacao)


            # Define o tipo de normalização a ser utilizado nos dados
            scaler = StandardScaler()

            # Normaliza os dados coletados
            DataframeDeUtilizacao[TodasAsColunas] = scaler.fit_transform(DataframeDeUtilizacao[TodasAsColunas])
            print("Base de dados normalizada: ")
            print(DataframeDeUtilizacao)

            # Converte os valores para float32
            DataframeDeUtilizacao = DataframeDeUtilizacao.astype('float32')
            print("Shape do dataframe atual:", DataframeDeUtilizacao.shape)
            # Transforma os dados 2D em dados 3D
            DataframeDeUtilizacao = DataframeDeUtilizacao.values.reshape(-1, 168, 19)
            print("Shape do novo dataframe:", DataframeDeUtilizacao.shape)


            # Prevê as próximas 24 linhas (1 Dia) com base nesses dados
            Previsao = IA.predict(DataframeDeUtilizacao)
            print("Previsao realizada com sucesso")

            # Quebra a previsão em um novo CSV
            DataframePrevisao = pd.DataFrame(np.array(Previsao[0]))
            DataframePrevisao.columns = TodasAsColunas
            print("Previsao convertida para um CSV: ")
            print(DataframePrevisao)

            # Desnormaliza esse CSV
            DataframePrevisao = pd.DataFrame(scaler.inverse_transform(DataframePrevisao), columns=TodasAsColunas)
            print("Previsao desnormalizada: ")
            print(DataframePrevisao)


            # Converte os valores de tempo que estão em segundos para valores convencionais (YYYY/MM/DD e HH/MM)
            DataframePrevisao["Data (YYYY-MM-DD)"] = pd.to_datetime(DataframePrevisao["Data (Segundos)"], unit='s')
            DataframePrevisao["Data (YYYY-MM-DD)"] = DataframePrevisao["Data (YYYY-MM-DD)"].dt.strftime('%Y-%m-%d')
            DataframePrevisao["Hora (HH-MM)"] = DataframePrevisao["Data (Segundos)"].apply(lambda x: pd.to_datetime(x, unit='s').strftime('%H:%M:%S'))
            DataframePrevisao.drop(columns=['Data (Segundos)'], inplace=True)
            # Converte os vetores de vento para velocidade e angulação do vento
            DataframePrevisao['Velocidade horaria do vento (m/s)'] = np.sqrt(DataframePrevisao['VentoX']**2 + DataframePrevisao['VentoY']**2)
            DataframePrevisao['Direcao horaria do vento a partir do norte (gr)'] = np.arctan2(DataframePrevisao['VentoY'], DataframePrevisao['VentoX']) * 180 / np.pi
            DataframePrevisao['Velocidade rajada vento (m/s)'] = np.sqrt(DataframePrevisao['VentoRajadaX']**2 + DataframePrevisao['VentoRajadaY']**2)
            DataframePrevisao.drop(columns=['VentoX', 'VentoY', 'VentoRajadaX', 'VentoRajadaY'], inplace=True)
            print("Dados organizados no padrão de coleta: ")
            print(DataframePrevisao)

            # Adiciona a coluna de "Estacao" no dataframe novamente
            DataframePrevisao['Estacao'] = 'MG-01'
            print("Colunas com a Estacao marcada com MG-01 adicionada: ")
            print(DataframePrevisao)

            # Define o dia de amanha com base no fuso horario de São Paulo
            os.environ['TZ'] = 'America/Sao_Paulo'
            time.tzset()
            data = time.strftime("%Y-%m-%d", time.localtime(time.time() + 86400))  # 86400 segundos = 1 dia
            print(f'Dia de amanhã: {data}')

            DataframePrevisao['Data (YYYY-MM-DD)'] = data
            # Gera a coluna de horas (de 00:00 a 23:00)
            horas = [f"{str(i).zfill(2)}:00" for i in range(24)]
            DataframePrevisao['Hora (HH-MM)'] = horas

            # Altera os parâmetros de tempo da saída da IA:
            DataframePrevisao.drop(columns=['Data (YYYY-MM-DD)','Hora (HH-MM)'])
            print("Colunas de tempo da previsão realizada pelo modelo discartada.")
            
            print(DataframePrevisao)

            # Apaga todas as linhas da tabela "sensores" onde o valor de "Estação" é 'MG-01'
            ConsultaDelete = "DELETE FROM sensores WHERE Estacao = %s"
            CursorPrevisao.execute(ConsultaDelete, (EstacaoDesejada,))
            ConexaoPrevisao.commit()
            print('Todas as linhas da tabela "sensores" foram deletadas')

            # Atribue as informações do dataframe as 24 listas de hora correspondentes a cada hora do dia
            Horas = [None] * 24
            for hora in range(24):
                Horas[hora] = [
                    DataframePrevisao.loc[hora, 'Data (YYYY-MM-DD)'],
                    DataframePrevisao.loc[hora, 'Hora (HH-MM)'],
                    Convert(DataframePrevisao.loc[hora, 'Precipitacao horario total (mm)']),
                    Convert(DataframePrevisao.loc[hora, 'Pressao atmosferica horaria ao nivel da estacao (mB)']),
                    Convert(DataframePrevisao.loc[hora, 'Pressao atmosferica maxima na hora anterior (mB)']),
                    Convert(DataframePrevisao.loc[hora, 'Pressao atmosferica minima na hora anterior (mB)']),
                    Convert(DataframePrevisao.loc[hora, 'Radiacao global (KJ/m2)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura do ar (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura do ponto de orvalho (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura maxima hora anterior (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura minima hora anterior (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura do ponto de orvalho maximo hora anterior (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Temperatura do ponto de orvalho minima hora anterior (C)']),
                    Convert(DataframePrevisao.loc[hora, 'Umidade relativa do ar maxima hora anteior(%)']),
                    Convert(DataframePrevisao.loc[hora, 'Umidade relativa do ar minima hora anterior (%)']),
                    Convert(DataframePrevisao.loc[hora, 'Umidade relativa do ar (%)']),
                    Convert(DataframePrevisao.loc[hora, 'Direcao horaria do vento a partir do norte (gr)']),
                    Convert(DataframePrevisao.loc[hora, 'Velocidade rajada vento (m/s)']),
                    Convert(DataframePrevisao.loc[hora, 'Velocidade horaria do vento (m/s)']),
                    DataframePrevisao.loc[hora, 'Estacao']
                ]

            # Exibe os valores das variáveis Hora0, Hora1, ..., Hora23
            for i, Hora in enumerate(Horas):
                print(f'Hora{i}:', Hora)
                
                # Adiciona os valores previstos pelo modelo na tabela "sensores"
                InsertLinePrevisao(Hora)
            

            # Atualiza a variável de status no SQL na tabela "sensores"
            StatusUpdateQuerry = '''
            UPDATE sensores
            SET status = 1
            WHERE Estacao = 'MG-01'
            LIMIT 1
            '''
            CursorPrevisao.execute(StatusUpdateQuerry)
            ConexaoPrevisao.commit()
            
        else:
            print("A previsao já foi realizada pelo modelo")

    else:
        print("Dados coletados insuficientes no banco de dados para que uma previsão seja realizada")
        
        # Atualiza a variável de status no SQL na tabela "sensores"
        StatusUpdateQuerry = '''
        UPDATE sensores
        SET status = 1
        WHERE Estacao = 'MG-01'
        LIMIT 1
        '''
        CursorPrevisao.execute(StatusUpdateQuerry)
        ConexaoPrevisao.commit()

    for k in range(0,15):
        print("Minuto: " + str(k) + ". Esperando até que o loop possa ser executado novamente...")
        time.sleep(60)
        k+=1