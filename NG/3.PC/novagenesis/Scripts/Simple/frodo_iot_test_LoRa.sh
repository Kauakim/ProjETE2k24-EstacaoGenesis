BASE=`cd ../..; pwd`;

######################## NOTES ###################################

#this script starts NG with the main componets
#In the local scnario there are to elements 
#	EPGS1 MAC: 24:6f:28:22:2c:84
#	EPGS2 MAC: 24:6f:28:22:2c:88 
#	GW_STD MAC: 3c:71:bf:fc:b8:c8
# Topology
# NG (install in a PC) <=> GW (LoRa <=> WiFi) <=> EPGS (NG embeded)
#  ____________		____________		___________
#  |           |		|           |		|          | 
#  |   NG      |	WIFI	|   GW_STD  |	LoRA	|   EPGS   |
#  |           |		|           |		|          |
#  |___________|		|___________|		|__________|

##################################################################


gnome-terminal --tab --title="PGCS" -e "/bin/bash -c 'cd $BASE/cmake-build-debug;./PGCS $BASE/IO/PGCS/ 1 Intra_Domain -pc Wi-Fi Intra_Domain wlp63s0 e0:e2:e6:00:71:0c 200;exec bash'" \
--tab --title="HTS" -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./HTS $BASE/IO/HTS/;exec bash'" \
--tab --title="GIRS" -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./GIRS $BASE/IO/GIRS/;exec bash'" \
--tab --title="PSS" -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./PSS $BASE/IO/PSS/;exec bash'" \
--tab --title="IoTTestApp" -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 60;./IoTTestApp IoTTestApp $BASE/IO/IoTTestApp/;exec bash'" 

# Original version

##gnome-terminal --tab --title="PGCS" "/bin/bash -c 'cd $BASE/cmake-build-debug;./PGCS $BASE/IO/PGCS/ 1 Intra_Domain -pc Wi-Fi Intra_Domain wlp18s0 3c:71:bf:fc:b8:c8 1200;exec bash'" \
##--tab --title="HTS" "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./HTS $BASE/IO/HTS/;exec bash'" \
##--tab --title="GIRS" "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./GIRS $BASE/IO/GIRS/;exec bash'" \
##--tab --title="PSS" "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./PSS $BASE/IO/PSS/;exec bash'" \
##--tab --title="IoTTestApp1" "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 60;./IoTTestApp IoTTestApp $BASE/IO/IoTTestApp/;exec bash'" 
