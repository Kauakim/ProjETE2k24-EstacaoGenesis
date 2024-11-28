A Estação Genesis é uma estação meteorológica inovadora desenvolvida pela equipe 3101 para a ProjETE 2K24, a prestigiada feira de projetos da ETE FMC. A estação foi projetada para coletar as informações de um local específico e realizar automaticamente a previsão do tempo, de maneira muito mais confiável, já que essas previsões não dependem das informações coletadas a distâncias consideráveis da região e nem da interpretação humana. Projetada para atender as necessidades do agronegócio, também pode ser utilizada nas mais diversas áreas de atuação, como turismo, transporte e administração pública.

Alimentada via painéis solares e baterias, que não só reduzem os custos operacionais como também tornam a solução mais sustentável, pois promovem uma abordagem ambientalmente consciente, o projeto coleta as informações do tempo de um local, como temperatura, pressão, umidade, velocidade e direção do vento, pluviometria, radiação solar e UV e localização, por meio da utilização dos sensores de altíssima qualidade e precisão fornecidos pela Ativa Soluções, uma das melhores empresas desse tipo de equipamento em todo país. 

Esses equipamentos são operados na estação meteorológica por um LoRa32 V2 (ESP-32) da Heltec, sendo este o microcontrolador utilizado no produto. Após processadas, as informações adquiridas pelo projeto são então enviadas para um servidor localmente via LoRa (Long Range), por meio de uma arquitetura de transmissão completamente inovadora, a Nova Genesis, projeto que promete solucionar diversos problemas da comunicação como conhecemos.

Ao chegarem no servidor, as informações são utilizadas pela IA do projeto, uma rede neural LSTM desenvolvida em Python com Tensorflow. Com essas previsões realizadas, os dados são finalmente armazenados em um banco de dados MySQL criado pela equipe e então disponibilizados e exibidos no site do projeto via dashboard, gêmeo digital ou chatbot.


------------------------------------------------------------------------------------------------------------------------


# Estação Genesis 🌦️

A **Estação Genesis** é uma estação meteorológica inovadora desenvolvida pela equipe **3101** para a **ProjETE 2K24**, a prestigiada feira de projetos da **ETE FMC**. O projeto foi criado para fornecer previsões meteorológicas precisas e automáticas, adaptadas às condições específicas de um local, eliminando a dependência de dados de regiões distantes ou de interpretações humanas. 

Embora projetada inicialmente para atender o **agronegócio**, a Estação Genesis é versátil, com aplicações em áreas como **turismo**, **transporte** e **administração pública**.

---

## 🚀 Funcionalidades

1. **Monitoramento meteorológico local**:  
   Coleta dados ambientais como:
   - Temperatura
   - Pressão atmosférica
   - Umidade relativa do ar
   - Velocidade e direção do vento
   - Pluviometria
   - Radiação solar e UV
   - Localização

2. **Previsão do tempo com IA**:  
   - Utiliza uma rede neural LSTM desenvolvida em Python com TensorFlow para prever condições climáticas com alta precisão.

3. **Sustentabilidade**:  
   - Alimentada por **painéis solares** e **baterias**, garantindo eficiência energética e redução de custos operacionais.

4. **Comunicação inovadora com Nova Genesis**:  
   - Sistema de transmissão baseado em **LoRa (Long Range)** para envio de dados ao servidor.

5. **Visualização acessível**:  
   - Dados disponíveis via **dashboard**, **gêmeo digital** ou **chatbot**, oferecendo insights intuitivos.

---

## 🧠 Tecnologias Utilizadas

### Hardware:
- **LoRa32 V2 (ESP-32)**: Microcontrolador principal da estação, fornecido pela Heltec.
- **Sensores de alta precisão**: Equipamentos fornecidos pela **Ativa Soluções**, capturando dados meteorológicos com confiabilidade superior.
- **Painéis solares e baterias**: Para operação contínua e sustentável.

### Software:
- **Rede neural LSTM**:
  - Linguagem: Python
  - Framework: TensorFlow
  - Finalidade: Previsão meteorológica baseada nos dados coletados.
- **Banco de dados MySQL**: Armazenamento estruturado dos dados processados.
- **Dashboard interativo**: Visualização dos dados em tempo real.
- **Nova Genesis**: Arquitetura de transmissão para comunicação confiável via LoRa.

---

## 🛠️ Arquitetura do Sistema

1. **Coleta de dados**:  
   - Sensores capturam informações meteorológicas específicas do local.
   
2. **Processamento no microcontrolador**:  
   - O **LoRa32 V2 (ESP-32)** processa e transmite os dados via LoRa.

3. **Transmissão de dados**:  
   - Uso da arquitetura **Nova Genesis** para comunicação local, eficiente e confiável.

4. **Análise e previsão**:  
   - A IA baseada em LSTM processa os dados para gerar previsões climáticas.

5. **Armazenamento e exibição**:  
   - Informações armazenadas em um banco de dados MySQL e exibidas em um **site interativo**.

---

## 🌍 Impacto

A **Estação Genesis** promove uma abordagem sustentável e tecnológica para a previsão meteorológica, atendendo demandas críticas de setores variados, como:
- **Agronegócio**: Otimização de plantio e colheita com base em previsões precisas.
- **Transporte**: Planejamento logístico mais eficiente.
- **Turismo**: Previsões climáticas locais para melhorar a experiência do visitante.
- **Administração pública**: Gestão de recursos e prevenção de desastres naturais.

---

## 🏆 Reconhecimentos

Desenvolvida para a **ProjETE 2K24**, a **Estação Genesis** já se destaca como um exemplo de inovação e tecnologia aplicada.

---

## 📬 Contato

Para mais informações, entre em contato com a equipe **3101** ou visite nosso site oficial (em breve).

---

**Equipe 3101 | ETE FMC | ProjETE 2K24**  
