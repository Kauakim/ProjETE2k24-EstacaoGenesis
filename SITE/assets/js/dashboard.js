/*
function GraficoBarra(selector, value, maxValue, color, label, title) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [{
            data: [percentage]
        }],
        chart: {
            height: 200,
            type: 'bar',
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '20%',
                colors: {
                    backgroundBarColors: ['#40475D']
                }
            }
        },
        colors: [color],
        stroke: {
            width: 0
        },
        title: {
            floating: true,
            offsetX: -10,
            offsetY: 5,
            text: title
        },
        subtitle: {
            floating: true,
            align: 'right',
            offsetY: 0,
            text: `${value} / ${maxValue}`,
            style: {
                fontSize: '12px'
            }
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: [label]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1
        }
    };

    document.querySelector(selector).innerHTML = '';
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

function GraficoCircular(selector, value, maxValue, color, label, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 250,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 5,
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 105,
                        fontSize: '25px',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    document.querySelector(selector).innerHTML = '';
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}
*/
//----------------------------------------------------------------------------------------------------------------

function GraficoCircularSVG(selector, value, maxValue, color, label, svgIcon, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 170,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 2,
                    size: '60%',
                    image: svgIcon,
                    imageWidth: 50,
                    imageHeight: 50,
                    imageClipped: false
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 86,
                        fontSize: '1.4rem',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    document.querySelector(selector).innerHTML = '';
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

function MiniGraficoCircularSVG(selector, value, maxValue, color, label, svgIcon, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 175,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 3,
                    size: '50%',
                    image: svgIcon,
                    imageWidth: 20,
                    imageHeight: 20,
                    imageClipped: false
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 62,
                        fontSize: '1.05rem',
                        margin: '0px',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    document.querySelector(selector).innerHTML = '';
    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

const IconeChuva = '../assets/SVG/Chuva.svg';
const IconeRadiacaoSolar = '../assets/SVG/RadiacaoSolar.svg';
const IconeSensacaoTermica = '../assets/SVG/SensacaoTermica.svg';
const IconeTemperaturaMinima = '../assets/SVG/TermometroMinima.svg';
const IconeTemperaturaMedia = '../assets/SVG/TermometroMedia.svg';
const IconeTemperaturaMaxima = '../assets/SVG/TermometroMaxima.svg';
const IconePontoDeOrvalhoMinimo = '../assets/SVG/PontoDeOrvalhoMinimo.svg';
const IconePontoDeOrvalhoMedio = '../assets/SVG/PontoDeOrvalhoMedio.svg';
const IconePontoDeOrvalhoMaximo = '../assets/SVG/PontoDeOrvalhoMaximo.svg';
const IconePressaoAtomsfericaMinima = '../assets/SVG/PressaoMinima.svg';
const IconePressaoAtomsfericaMedia = '../assets/SVG/PressaoMedia.svg';
const IconePressaoAtomsfericaMaxima = '../assets/SVG/PressaoMaxima.svg';
const IconeUmidadeMinima = '../assets/SVG/UmidadeMinima.svg';
const IconeUmidadeMedia = '../assets/SVG/UmidadeMedia.svg';
const IconeUmidadeMaxima = '../assets/SVG/UmidadeMaxima.svg';
const IconeDirecaoVento = '../assets/SVG/Bussola.svg';
const IconeVento = '../assets/SVG/Vento.svg';
const IconeVentoRajada = '../assets/SVG/VentoForte.svg';

//----------------------------------------------------------------------------------------------------------------

let Estacao = "MG-01";
let Data = "12/12/2019";
let Hora = "12:00:00";
let CorGraficos = 'var(--dash-p1)';


document.addEventListener('DOMContentLoaded', function () {
    const closeConfig = document.querySelector('.fechar-config');

    // Adiciona evento de clique aos círculos de cor
    const estiloElementos = document.querySelectorAll('.circle-color');
    estiloElementos.forEach((elemento) => {
        elemento.addEventListener('click', () => {
            estiloElementos.forEach((el) => el.classList.remove('selected')); // Remove a seleção de todos
            elemento.classList.add('selected'); // Marca o círculo clicado como selecionado
        });
    });

    closeConfig.addEventListener('click', () => {
        // Atualiza as variáveis globais com os novos valores dos inputs
        Estacao = document.getElementById('estacao').value;
        Data = document.getElementById('data').value;
        Hora = document.getElementById('hora').value;
        Data = dayjs(Data).format('DD/MM/YYYY');
        Hora = Hora + ":00";

        // Coleta a cor selecionada (estilo)
        Estilo = 'yellow';
        estiloElementos.forEach((elemento) => {
            if (elemento.classList.contains('selected')) {
                Estilo = elemento.getAttribute('data-color') || 'Cor não definida'; // Captura a cor do atributo data-color
            }
        });

        paleta = document.getElementById('paleta');

        if(Estilo == "yellow"){
            paleta.href = "../assets/CSS/paleta1.css";
            CorGraficos = 'var(--dash-p1)';
        }
        else if(Estilo == "green"){
            paleta.href = "../assets/CSS/paleta2.css";
            CorGraficos = 'var(--dash-p2)';
        }
        else if(Estilo == "blue"){
            paleta.href = "../assets/CSS/paleta3.css";
            CorGraficos = 'var(--dash-p3)';
        }
        else if(Estilo == "black"){
            paleta.href = "../assets/CSS/paleta4.css";
            CorGraficos = 'var(--dash-p4)';
        }
        else if(Estilo == "white"){
            paleta.href = "../assets/CSS/paleta5.css";
            CorGraficos = 'var(--dash-p5)';
        }
        else if(Estilo == "grey"){
            paleta.href = "../assets/CSS/paleta6.css";
            CorGraficos = 'var(--dash-p6)';
        }
        
        // Printa as informações no console
        console.log(`Estação: ${Estacao}`);
        console.log(`Data: ${Data}`);
        console.log(`Hora: ${Hora}`);
        console.log(`Estilo: ${Estilo}`);
        console.log(`Cor dos Gráficos: ${CorGraficos}`);

        // Fecha a aba de configurações
        const glassBackground = document.querySelector('.glass-background');
        glassBackground.classList.remove('visible');
        closeConfig.closest('.pai-ct-config').classList.remove('open');

        // Atualiza o restante do código da aba
        AtualizarExibirGraficos();
    });
});


let Fonte;
let ChuvaTotal, TemperaturaMinimaAbsoluta, TemperaturaMaximaAbsoluta, PressaoMediaAbsoluta, UmidadeMediaAbsoluta, VentoMedio;
let Chuva, RadiacaoSolar, TemperaturaMinima, TemperaturaMedia, TemperaturaMaxima, TemperaturaPontoDeOrvalhoMinima, TemperaturaPontoDeOrvalhoMedia, TemperaturaPontoDeOrvalhoMaxima, PressaoMinima, PressaoMedia, PressaoMaxima, UmidadeMinima, UmidadeMedia, UmidadeMaxima, DirecaoVento, Vento, VentoRajada, SensacaoTermica;


// Funções responsáveis por coletar os dados do banco de dados do projeto
async function BuscarHoraNoHistorico() {
    try {
        // Busca os dados desejados na tabela de historico
        const response = await fetch(`http://localhost:55000/historico?dia=${Data}`);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.log('Erro na resposta da requisição: ' + response.status);
            return false;
        }

        // Coleta os dados recebidos na requisição
        const data = await response.json();
        // Exibe todos os dados coletados no console da aplicação
        console.log('Dados do histórico:', data);

        try {
            // Filtra as linhas onde a variável Estacao é igual a "MG-01"
            const LinhasDesejadasHistorico = data.filter(linha => linha.Estacao === Estacao || linha.Estacao === Estacao+"\r");

            // Conta o número de linhas que cumprem com esses requisitos
            const NumeroLinhasDesejadasHistorico = LinhasDesejadasHistorico.length;
            if (NumeroLinhasDesejadasHistorico == 24) {
                // Exibe no console o número de linhas que contém a estação escolhida pelo usário como valor de Estacao
                console.log('Número de linhas desejdas para a estação definidos pelo usuário: ', NumeroLinhasDesejadasHistorico);

                // Coleta a linha que possui as informações correspondentes a hora requisitada pelo usuário
                const LinhaHoraDesejadaHistorico = LinhasDesejadasHistorico.filter(linha => linha.Hora === Hora);
                if (LinhaHoraDesejadaHistorico.length === 0) {
                    console.log("A hora desejada não está disponível no banco de dados do historico");
                    return false;
                } else {
                    // Exibe no console a linha da hora desejada pelo usuário
                    console.log('Linha da hora desejda pelo usuário:', LinhaHoraDesejadaHistorico);
                    
                    const Linha = LinhaHoraDesejadaHistorico[0];
                    console.log(Linha);

                    Chuva = Linha.Precipitacao_horario_total_mm.toFixed(2);
                    RadiacaoSolar = Linha.Radiacao_global.toFixed(2);
                    TemperaturaMinima = Linha.Temp_min_hora_anterior.toFixed(2);
                    TemperaturaMedia = Linha.Temp_ar.toFixed(2);
                    TemperaturaMaxima = Linha.Temp_max_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMinima = Linha.Temp_ponto_orvalho_min_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMedia = Linha.Temp_ponto_orvalho.toFixed(2);
                    TemperaturaPontoDeOrvalhoMaxima = Linha.Temp_ponto_orvalho_max_hora_anterior.toFixed(2);
                    PressaoMinima = Linha.PA_min_hora_anterior.toFixed(2);
                    PressaoMedia = Linha.PA_horaria_nivel_estacao.toFixed(2);
                    PressaoMaxima = Linha.PA_max_hora_anterior.toFixed(2);
                    UmidadeMinima = Linha.Umidade_relativa_ar_min_hora_anterior.toFixed(2);
                    UmidadeMedia = Linha.Umidade_relativa_do_ar.toFixed(2);
                    UmidadeMaxima = Linha.Umidade_relativa_ar_max_hora_anterior.toFixed(2);
                    DirecaoVento = Linha.Direcao_horaria_vento_partir_norte;
                    DirecaoVento = parseFloat(DirecaoVento).toFixed(2);
                    Vento = Linha.Velocidade_horaria_vento.toFixed(2);
                    VentoRajada = Linha.Velocidade_rajada_vento.toFixed(2);
                    SensacaoTermica = (13.12 + (0.6215 * Number(TemperaturaMedia)) - (11.37 * Math.pow(Number(Vento), 0.16)) + (0.3965 * Number(TemperaturaMedia) * Math.pow(Number(Vento), 0.16))).toFixed(2);

                    return true;
                }
            } else {
                console.log("Não foi possível encontrar nenhum resultado para a colte dos dados do dia requisitado pelo usuário.");
                return false;
            }
        } catch (error) {
            console.error('Erro ao processar as informações:', error.stack);
            return false;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do histórico:', error.stack);
        return false;
    }
}

async function BuscarMediaNoHistorico() {
    try {
        // Busca os dados desejados na tabela de historico
        const response = await fetch(`http://localhost:55000/historico?dia=${Data}&estacao=${Estacao}`);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.log('Erro na resposta da requisição: ' + response.status);
            return false;
        }

        // Coleta os dados recebidos na requisição
        const data = await response.json();
        // Exibe todos os dados coletados no console da aplicação
        console.log('Dados do histórico:', data);

        try {
            // Filtra as linhas onde a variável Estacao é igual a "MG-01"
            const LinhasDesejadasHistorico = data.filter(linha => linha.Estacao === Estacao || linha.Estacao === Estacao+"\r");

            // Conta o número de linhas que cumprem com esses requisitos
            const NumeroLinhasDesejadasHistorico = LinhasDesejadasHistorico.length;
            if (NumeroLinhasDesejadasHistorico >= 24) {
                // Exibe no console o número de linhas que contém a estação escolhida pelo usário como valor de Estacao
                console.log('Número de linhas desejdas para a estação definidos pelo usuário: ', NumeroLinhasDesejadasHistorico);

                //Descobre se a última hora coletada do banco de dados corresponde a ao menos às 23 horas
                let UltimaLinhaDesejadaHistorico = LinhasDesejadasHistorico[23];
                let HoraUltimaLinha = parseInt(UltimaLinhaDesejadaHistorico.Hora.split(":")[0], 10);
                if (HoraUltimaLinha >= 23) {
                    console.log("A media dos dados diários pode ser calculada com base nos dados do historico");
                    
                    TemperaturaMaximaAbsoluta = (Math.max(...LinhasDesejadasHistorico.map(linha => linha.Temp_max_hora_anterior))).toFixed(2);
                    TemperaturaMinimaAbsoluta = (Math.min(...LinhasDesejadasHistorico.map(linha => linha.Temp_min_hora_anterior))).toFixed(2);
                    ChuvaTotal = (LinhasDesejadasHistorico.reduce((acc, linha) => acc + linha.Precipitacao_horario_total_mm, 0)).toFixed(2);
                    PressaoMediaAbsoluta = (LinhasDesejadasHistorico.reduce((acc, linha) => acc + linha.PA_horaria_nivel_estacao, 0) / NumeroLinhasDesejadasHistorico).toFixed(2);
                    UmidadeMediaAbsoluta = (LinhasDesejadasHistorico.reduce((acc, linha) => acc + linha.Umidade_relativa_do_ar, 0) / NumeroLinhasDesejadasHistorico).toFixed(2);
                    VentoMedio = (LinhasDesejadasHistorico.reduce((acc, linha) => acc + linha.Velocidade_horaria_vento, 0) / NumeroLinhasDesejadasHistorico).toFixed(2);

                    return true;
                }
                else {
                    console.log("A media dos dados diários ainda não pode ser calculada com base nos dados do historico");
                    return false;
                }
            } else {
                console.log("Não foi possível encontrar resultados suficientes na coleta dos dados do dia requisitado pelo usuário.");
                return false;
            }
        } catch (error) {
            console.error('Erro ao processar as informações:', error.stack);
            return false;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do histórico:', error.stack);
        return false;
    }
}

async function BuscarHoraNaPrevisao() {
    try {
        // Busca os dados desejados na tabela de previsao
        const response = await fetch('http://localhost:55000/previsao');
        const data = await response.json();

        // Exibe todos os dados coletados no console da aplicação
        console.log('Dados da previsão:', data);

        try {
            // Filtra as linhas onde a variável Estacao é igual a "MG-01" e a variável Dia é igual a data selecionada pelo usuário
            const LinhasDesejadasPrevisao = data.filter(linha => linha.Estacao === Estacao && linha.Dia === Data);

            // Conta o número de linhas que cumprem com esses requisitos
            const NumeroLinhasDesejadasPrevisao = LinhasDesejadasPrevisao.length;
            if (NumeroLinhasDesejadasPrevisao == 24) {
                // Exibe no console o número de linhas que contém MG-01 como valor de Estacao
                console.log('Número de linhas desejdas para os valores de dia e estação definidos pelo usuário:', NumeroLinhasDesejadasPrevisao);

                // Coleta a linha que possui as informações correspondentes a hora requisitada pelo usuário
                const LinhaHoraDesejadaPrevisao = LinhasDesejadasPrevisao.filter(linha => linha.Hora === Hora);
                if (LinhaHoraDesejadaPrevisao.length === 0) {
                    console.log("A hora desejada não está disponível no banco de dados da previsao");
                    return false;
                } else {
                    // Exibe no console a linha da hora desejada pelo usuário
                    console.log('Linha da hora desejda pelo usuário:', LinhaHoraDesejadaPrevisao);
                    
                    const Linha = LinhaHoraDesejadaPrevisao[0];
                    
                    Chuva = Linha.Precipitacao_horario_total_mm.toFixed(2);
                    RadiacaoSolar = Linha.Radiacao_global.toFixed(2);
                    TemperaturaMinima = Linha.Temp_min_hora_anterior.toFixed(2);
                    TemperaturaMedia = Linha.Temp_ar.toFixed(2);
                    TemperaturaMaxima = Linha.Temp_max_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMinima = Linha.Temp_ponto_orvalho_min_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMedia = Linha.Temp_ponto_orvalho.toFixed(2);
                    TemperaturaPontoDeOrvalhoMaxima = Linha.Temp_ponto_orvalho_max_hora_anterior.toFixed(2);
                    PressaoMinima = Linha.PA_min_hora_anterior.toFixed(2);
                    PressaoMedia = Linha.PA_horaria_nivel_estacao.toFixed(2);
                    PressaoMaxima = Linha.PA_max_hora_anterior.toFixed(2);
                    UmidadeMinima = Linha.Umidade_relativa_ar_min_hora_anterior.toFixed(2);
                    UmidadeMedia = Linha.Umidade_relativa_do_ar.toFixed(2);
                    UmidadeMaxima = Linha.Umidade_relativa_ar_max_hora_anterior.toFixed(2);
                    DirecaoVento = Linha.Direcao_horaria_vento_partir_norte;
                    DirecaoVento = parseFloat(DirecaoVento).toFixed(2);
                    Vento = Linha.Velocidade_horaria_vento.toFixed(2);
                    VentoRajada = Linha.Velocidade_rajada_vento.toFixed(2);
                    SensacaoTermica = (13.12 + (0.6215 * Number(TemperaturaMedia)) - (11.37 * Math.pow(Number(Vento), 0.16)) + (0.3965 * Number(TemperaturaMedia) * Math.pow(Number(Vento), 0.16))).toFixed(2);

                    return true;
                }
            } else {
                console.log("Não foi possível encontrar nenhum resultado para a colte dos dados do dia requisitado pelo usuário.");
                return false;
            }
        } catch (error) {
            console.error('Erro ao processar as informações:', error.stack);
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}

async function BuscarMediaNaPrevisao(){
    try {
        // Busca os dados desejados na tabela de previsao
        const response = await fetch('http://localhost:55000/previsao');
        const data = await response.json();

        // Exibe todos os dados coletados no console da aplicação
        console.log('Dados da previsão:', data);

        try {
            // Filtra as linhas onde a variável Estacao é igual a "MG-01" e a variável Dia é igual a data selecionada pelo usuário
            const LinhasDesejadasPrevisao = data.filter(linha => linha.Estacao === Estacao && linha.Dia === Data);

            // Conta o número de linhas que cumprem com esses requisitos
            const NumeroLinhasDesejadasPrevisao = LinhasDesejadasPrevisao.length;
            if (NumeroLinhasDesejadasPrevisao >= 24) {
                // Exibe no console o número de linhas que contém MG-01 como valor de Estacao
                console.log('Número de linhas desejdas para os valores de dia e estação definidos pelo usuário:', NumeroLinhasDesejadasPrevisao);

                TemperaturaMaximaAbsoluta = (Math.max(...LinhasDesejadasPrevisao.map(linha => linha.Temp_max_hora_anterior))).toFixed(2);
                TemperaturaMinimaAbsoluta = (Math.min(...LinhasDesejadasPrevisao.map(linha => linha.Temp_min_hora_anterior))).toFixed(2);
                ChuvaTotal = (LinhasDesejadasPrevisao.reduce((acc, linha) => acc + linha.Precipitacao_horario_total_mm, 0)).toFixed(2);
                PressaoMediaAbsoluta = (LinhasDesejadasPrevisao.reduce((acc, linha) => acc + linha.PA_horaria_nivel_estacao, 0) / NumeroLinhasDesejadasPrevisao).toFixed(2);
                UmidadeMediaAbsoluta = (LinhasDesejadasPrevisao.reduce((acc, linha) => acc + linha.Umidade_relativa_do_ar, 0) / NumeroLinhasDesejadasPrevisao).toFixed(2);
                VentoMedio = (LinhasDesejadasPrevisao.reduce((acc, linha) => acc + linha.Velocidade_horaria_vento, 0) / NumeroLinhasDesejadasPrevisao).toFixed(2);
                
                return true;
            } else {
                console.log("Não foi possível encontrar nenhum resultado para a coleta dos dados do dia requisitado pelo usuário.");
                return false;
            }
        } catch (error) {
            console.error('Erro ao processar as informações:', error.stack);
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}



async function DefinirDados() {
    if (await BuscarHoraNoHistorico() && await BuscarMediaNoHistorico()) {
        Fonte = 'Medição';
    } 
    else if (await BuscarMediaNaPrevisao()) {
        // Descobre se pelo menos os valores da hora escolhida pelo usuário já foram coletados
        if (await BuscarHoraNoHistorico()) {
            Fonte = 'Medição/Previsão';
        } 
        else if (await BuscarHoraNaPrevisao()) {
            Fonte = 'Previsão';
        }
        else {
            Fonte = 'Error';
            alert("Os dados requisitados por você não estão disponíveis no sistema. Altere os valores selecionados na configuração do site para tentar novamente.");
        }
    } 
}

//----------------------------------------------------------------------------------------------------------------

const EstacaoHTML = document.getElementById("NumeroEstacao");
const DiaHTML = document.getElementById("Dia");
const HoraHTML = document.getElementById("Hora");
const FonteHTML = document.getElementById("Fonte");

async function AtualizarExibirGraficos() {
    await DefinirDados();

    MiniGraficoCircularSVG('#InfoPluviometria', ChuvaTotal, 40, CorGraficos, 'Pluviometria', IconeChuva, ' mm');
    MiniGraficoCircularSVG('#InfoTemperaturaMinima', TemperaturaMinimaAbsoluta, 35, CorGraficos, 'Temperatura Minima', IconeTemperaturaMinima, ' °C');
    MiniGraficoCircularSVG('#InfoTemperaturaMaxima', TemperaturaMaximaAbsoluta, 45, CorGraficos, 'Temperatura Maxima', IconeTemperaturaMaxima, ' °C');
    MiniGraficoCircularSVG('#InfoPressaoAtmosferica', PressaoMediaAbsoluta, 1100, CorGraficos, 'Pressao Atmosferica', IconePressaoAtomsfericaMedia, ' mB');
    MiniGraficoCircularSVG('#InfoUmidade', UmidadeMediaAbsoluta, 100, CorGraficos, 'Umidade', IconeUmidadeMedia, ' %');
    MiniGraficoCircularSVG('#InfoVento', VentoMedio, 40, CorGraficos, 'Vento', IconeVento, ' m/s');

    GraficoCircularSVG('#GraficoChuva', Chuva, 30, CorGraficos, 'Chuva', IconeChuva, ' mm');
    GraficoCircularSVG('#GraficoRadiacaoSolar', RadiacaoSolar, 4000, CorGraficos, 'Radiacao Solar', IconeRadiacaoSolar, ' Kj');
    GraficoCircularSVG('#GraficoSensacaoTermica', SensacaoTermica, 40, CorGraficos, 'Sensacao Termica', IconeSensacaoTermica, ' °C');
    GraficoCircularSVG('#GraficoTemperaturaMinima', TemperaturaMinima, 35, CorGraficos, 'Temperatura Minima', IconeTemperaturaMinima, ' °C');
    GraficoCircularSVG('#GraficoTemperaturaMedia', TemperaturaMedia, 40, CorGraficos, 'Temperatura Media', IconeTemperaturaMedia, ' °C');
    GraficoCircularSVG('#GraficoTemperaturaMaxima', TemperaturaMaxima, 45, CorGraficos, 'Temperatura Maxima', IconeTemperaturaMaxima, ' °C');
    GraficoCircularSVG('#GraficoPontoDeOrvalhoMinimo', TemperaturaPontoDeOrvalhoMinima, 25, CorGraficos, 'Temperatura do Ponto de Orvalho Minima', IconePontoDeOrvalhoMinimo, ' °C');
    GraficoCircularSVG('#GraficoPontoDeOrvalhoMedio', TemperaturaPontoDeOrvalhoMedia, 30, CorGraficos, 'Temperatura do Ponto de Orvalho Media', IconePontoDeOrvalhoMedio, ' °C');
    GraficoCircularSVG('#GraficoPontoDeOrvalhoMaximo', TemperaturaPontoDeOrvalhoMaxima, 35, CorGraficos, 'Temperatura do Ponto de Orvalho Maxima', IconePontoDeOrvalhoMaximo, ' °C');
    GraficoCircularSVG('#GraficoPressaoMinima', PressaoMinima, 1100, CorGraficos, 'Pressao Atmosferica Minima', IconePressaoAtomsfericaMinima, ' mB');
    GraficoCircularSVG('#GraficoPressaoMedia', PressaoMedia, 1100, CorGraficos, 'Pressao Atmosferica Media', IconePressaoAtomsfericaMedia, ' mB');
    GraficoCircularSVG('#GraficoPressaoMaxima', PressaoMaxima, 1100, CorGraficos, 'Pressao Atmosferica Maxima', IconePressaoAtomsfericaMaxima, ' mB');
    GraficoCircularSVG('#GraficoUmidadeDoArMinima', UmidadeMinima, 100, CorGraficos, 'Umidade do Ar Minima', IconeUmidadeMinima, ' %');
    GraficoCircularSVG('#GraficoUmidadeDoArMedia', UmidadeMedia, 100, CorGraficos, 'Umidade do Ar Media', IconeUmidadeMedia, ' %');
    GraficoCircularSVG('#GraficoUmidadeDoArMaxima', UmidadeMaxima, 100, CorGraficos, 'Umidade do Ar Maxima', IconeUmidadeMinima, ' %');
    GraficoCircularSVG('#GraficoDirecaoVento', DirecaoVento, 360, CorGraficos, 'Direcao do Vento', IconeDirecaoVento, '°');
    GraficoCircularSVG('#GraficoVelocidadeVento', Vento, 10, CorGraficos, 'Velocidade do Vento', IconeVento, ' m/s');
    GraficoCircularSVG('#GraficoVelocidadeRajadaVento', VentoRajada, 15, CorGraficos, 'Velocidade de Rajada do Vento', IconeVentoRajada, ' m/s');

    EstacaoHTML.textContent = Estacao;
    DiaHTML.textContent = 'Dia ' + Data;
    HoraHTML.textContent = 'Hora: ' + Hora;
    FonteHTML.textContent = 'Fonte dos dados: ' + Fonte;
}

AtualizarExibirGraficos()

//----------------------------------------------------------------------------------------------------------------