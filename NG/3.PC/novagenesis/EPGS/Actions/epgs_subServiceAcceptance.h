/*
	NovaGenesis

	Name:		EPGS service acceptance
	Object:		epgs_subServiceAcceptance
	File:		epgs_subServiceAcceptance.h
	Author:		Vâner José Magalhães
	Date:		05/2021
	Version:	0.1

  	Copyright (C) 2021  Vâner José Magalhães

    This work is available under the GNU General Public License (See COPYING.txt).

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

#ifndef SUB_SERVICE_ACCEPTANCE_H_
#define SUB_SERVICE_ACCEPTANCE_H_

#include "../DataStructures/epgs_structures.h"
#include "../Common/ng_message.h"

int
ActionSubscriptionServiceAcceptance (NgNetInfo *hwInfo, NgNetInfo *pgcsSCNInf, NgScnIDInfo *pssSCNInfo, int seqNumber, char *key, NgMessage **subServiceAcceptanceMessage);

#endif /* SUB_SERVICE_ACCEPTANCE_H_ */ 
