BASE=`cd ../..; pwd`;

gnome-terminal --tab -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sh clean.sh;./PGCS $BASE/IO/PGCS/ 1 Intra_Domain -pc Wi-Fi Intra_Domain wlp63s0 e0:e2:e6:00:71:0c 200;exec bash'" \
--tab -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./HTS $BASE/IO/HTS/;exec bash'" \
--tab -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./GIRS $BASE/IO/GIRS/;exec bash'" \
--tab -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 10;./PSS $BASE/IO/PSS/;exec bash'" \
--tab -e "/bin/bash -c 'cd $BASE/cmake-build-debug;sleep 30;./IoTTestApp IoTTestApp1 $BASE/IO/IoTTestApp/;exec bash'"
