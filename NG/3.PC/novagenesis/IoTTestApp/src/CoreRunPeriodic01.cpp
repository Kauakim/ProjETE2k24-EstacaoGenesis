/*
	NovaGenesis

	Name:		CoreRunPeriodic01
	Object:		CoreRunPeriodic01
	File:		CoreRunPeriodic01.cpp
	Author:		Antonio Marcos Alberti
	Date:		05/2021
	Version:	0.1

  	Copyright (C) 2021  Antonio Marcos Alberti

    This work is available under the GNU Lesser General Public License (See COPYING.txt).

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

#ifndef _CORERUNPERIODIC01_H
#include "CoreRunPeriodic01.h"
#endif

#ifndef _HT_H
#include "HT.h"
#endif

#ifndef _CORE_H
#include "Core.h"
#endif

#ifndef _CMATH
#include <cmath>
#endif

#ifndef _CSTDLIB
#include <cstdlib> 
#endif

CoreRunPeriodic01::CoreRunPeriodic01(string _LN, Block *_PB, MessageBuilder *_PMB) : Action(_LN, _PB, _PMB)
{
    // Calculate the next database call time
    NextHour = std::ceil(GetTime() / 3600.0) * 3600;

    PB->S << " -> Current time: " << GetTime() << " seconds" << std::endl;
    PB->S << " -> Next database call set to: " << NextHour << " seconds" << std::endl;
    PB->S << " -> Next database call set to: " << (NextHour/3600) << " hours" << std::endl;
}

CoreRunPeriodic01::~CoreRunPeriodic01 ()
{
}

// Run the actions behind a received command line
// ng -run --periodic _Version
int
CoreRunPeriodic01::Run (Message *_ReceivedMessage, CommandLine *_PCL, vector<Message *> &ScheduledMessages, Message *&InlineResponseMessage)
{
  int Status = ERROR;
  string Offset = "                    ";
  Core *PCore = 0;
  CommandLine *PCL = 0;
  Message *RunPeriodic = 0;
  Message *RunEvaluate = 0;
  Message *RunPublishSSData = 0;

  vector<string> Limiters;
  vector<string> Sources;
  vector<string> Destinations;

  PCore = (Core *)PB;

  PB->S << endl << Offset <<  this->GetLegibleName() << endl;

  PB->S << Offset << "Next database call set to: " << NextHour << " seconds" << std::endl;
  PB->S << Offset << "Next database call set to: " << (NextHour/3600) << " hours" << std::endl;

  // *************************************************************
  // Schedule discovery message
  // *************************************************************
  vector<string> Cat2Keywords;

  // -----------------------------------------------------------------------------
  // Customize here the keywords for discovering the peers
  // -----------------------------------------------------------------------------

  Cat2Keywords.push_back ("Gateway");
  Cat2Keywords.push_back ("Controller");
  Cat2Keywords.push_back ("OS");
  Cat2Keywords.push_back ("Core");
  Cat2Keywords.push_back ("IoT");
  Cat2Keywords.push_back ("Proxy");
  Cat2Keywords.push_back ("Wi-Fi");

  vector<string> Cat9Keywords;

  Cat9Keywords.push_back ("Host");

  //PB->S << Offset <<  "(Schedule both steps discover message)"<<endl;

  // Schedule both steps on the same message
  PCore->DiscoveryFirstStep (PB->PP->GetDomainSelfCertifyingName (), &Cat2Keywords, &Cat9Keywords, ScheduledMessages);

  //PB->S << Offset <<  "(Schedule second step discover message)"<<endl;
  PCore->DiscoverySecondStep (PB->PP->GetDomainSelfCertifyingName (), &Cat2Keywords, &Cat9Keywords, ScheduledMessages);

  // ******************************************************
  // Schedule a message to run periodic again
  // ******************************************************

  // Setting up the process SCN as the space limiter
  Limiters.push_back (PB->PP->Intra_Process);

  // Setting up the block SCN as the source SCN
  Sources.push_back (PB->GetSelfCertifyingName ());

  // Setting up the block SCN as the destination SCN
  Destinations.push_back (PB->GetSelfCertifyingName ());

  // Creating a new message
  PB->PP->NewMessage (GetTime () + PCore->DelayBeforeRunPeriodic, 1, false, RunPeriodic);

  // Creating the ng -cl -m command line
  PMB->NewConnectionLessCommandLine ("0.1", &Limiters, &Sources, &Destinations, RunPeriodic, PCL);

  // Adding a ng -run --periodic command line
  RunPeriodic->NewCommandLine ("-run", "--periodic", "0.1", PCL);

  // Generate the SCN
  PB->GenerateSCNFromMessageBinaryPatterns (RunPeriodic, SCN);

  // Creating the ng -scn --s command line
  PMB->NewSCNCommandLine ("0.1", SCN, RunPeriodic, PCL);

  // ******************************************************
  // Finish
  // ******************************************************

  // Push the message to the GW input queue
  PCore->PGW->PushToInputQueue (RunPeriodic);

  // ******************************************************
  // Finish
  // ******************************************************


  // ******************************************************
  // Schedule a message to run evaluate again
  // ******************************************************

  // Creating a new message
  PB->PP->NewMessage (GetTime (), 1, false, RunEvaluate);

  // Creating the ng -cl -m command line
  PMB->NewConnectionLessCommandLine ("0.1", &Limiters, &Sources, &Destinations, RunEvaluate, PCL);

  // Adding a ng -run --periodic command line
  RunEvaluate->NewCommandLine ("-run", "--evaluate", "0.1", PCL);

  // Generate the SCN
  PB->GenerateSCNFromMessageBinaryPatterns (RunEvaluate, SCN);

  // Creating the ng -scn --s command line
  PMB->NewSCNCommandLine ("0.1", SCN, RunEvaluate, PCL);

  // ******************************************************
  // Finish
  // ******************************************************
  
  /*
  if(GetTime() > NextHour)
  {
      // Calculate the next full hour
      NextHour = std::ceil(GetTime() / 3600.0) * 3600;

      // Temperatura
      std::string temp = " " + to_string(PCore->ptemperatura->GetMean()); //Temp_ar
      std::string temp_max = " " + to_string(PCore->ptemperatura->GetMax()); //Temp_max_hora_anterior
      std::string temp_min = " " + to_string(PCore->ptemperatura->GetMin()); //Temp_min_hora_anterior

      // Umidade
      std::string um = " " + to_string(PCore->pumidade->GetMean()); //Umidade_relativa_do_ar
      std::string um_max = " " + to_string(PCore->pumidade->GetMax()); //Umidade_relativa_ar_max_hora_anterior
      std::string um_min = " " + to_string(PCore->pumidade->GetMin()); //Umidade_relativa_ar_min_hora_anterior

      // Pressão
      std::string ps = " " + to_string(PCore->ppressao->GetMean()); //PA_horaria_nivel_estacao
      std::string ps_max = " " + to_string(PCore->ppressao->GetMax()); //PA_max_hora_anterior
      std::string ps_min = " " + to_string(PCore->ppressao->GetMin()); //PA_min_hora_anterior

      // Radiação Solar
      std::string rad_sol = " " + to_string(PCore->pradiacao_solar->GetMean()); //Radiacao_global

      // Radiação UV
      std::string uv = " " + to_string(PCore->puv->GetMean()); //Radiacao_uv

      // Parânetros do vento
      std::string vel_vent = " " + to_string(PCore->pvelocidade_vento->GetMean()); //Velocidade_horaria_vento
      std::string raj_vent = " " + to_string(PCore->pvelocidade_vento->GetMax());  //Velocidade_rajada_vento
      std::string inc_vent = " " + to_string(PCore->pinclinacao_vento->GetMean()); //Direcao_horaria_vento_partir_norte
	    
      // Pluviometro
      std::string pl = " " + to_string(PCore->ppluv_count->GetSum()); //Precipitacao_horario_total_mm

      // Cálculo do ponto de orvalho
      std::string orv = " " + to_string(PCore->porv->GetMean()); //Temp_ponto_orvalho
      std::string orv_max = " " + to_string(PCore->porv->GetMax()); //Temp_ponto_orvalho_max_hora_anterior
      std::string orv_min = " " + to_string(PCore->porv->GetMin()); //Temp_ponto_orvalho_min_hora_anterior
      
      // Monitaramento do porta da estação
      std::string porta = " " + to_string(PCore->pbutton_state->GetMean()); //Val_porta

      // Cria o comando para chamar o script Python com os parâmetros
      std::string command = "python3 next.py " + pl + ps + ps_max + ps_min + rad_sol + temp + orv + temp_max + temp_min + orv_max + orv_min + um_max + um_min + um + inc_vent + raj_vent + vel_vent + uv + porta;

      // Executa o comando e espera o resultado
      int result = system(command.c_str());

      if (result == 0) {
          PB->S << Offset << "Python script executed successfully." << std::endl;
      } 
      else {  
          PB->S << Offset << "Error: Python script execution failed." << std::endl;
      }

      // Realiza o reset dos parâmetros para realizar a medida exata do próximo ciclo
      PCore->ptemperatura->Reset ();
      PCore->pumidade->Reset ();
      PCore->ppressao->Reset ();
      PCore->pradiacao_solar->Reset ();
      PCore->puv->Reset ();
      PCore->pvelocidade_vento->Reset ();
      PCore->pinclinacao_vento->Reset ();
      PCore->ppluv_count->Reset ();
      PCore->pbutton_state->Reset ();
      PCore->porv->Reset ();
  }
  */

  // Push the message to the GW input queue
  PCore->PGW->PushToInputQueue (RunEvaluate);

  if (PB->State == "operational")
	{
	  PB->PP->MarkMalformedMessagesPerNoCLs (2);
	}

  PB->S << Offset <<  "(Done)" << endl << endl << endl;

  return Status;
}
