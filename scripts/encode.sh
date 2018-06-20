# MP4Box -version
cd "../data/AUDIO"

encode () {
  cd "$1";
  shopt -s nullglob
  for i in *.wav; do
    # get all stem filenames
    name=`echo $i | awk -F".wav" '{$0=$1}1'`;
    # encode to AAC using Fraunhofer AAC encoding parameters
    afconvert $i $name.caf -d 0 -f caff --soundcheck-generate
    afconvert $name.caf -d aac -f m4af -u pgcm 2 --soundcheck-read -b 128000 -q 127 -s 2 $name.m4a
    rm $name.wav $name.caf
  done
  cd ..;
}

for submission in ./*
do
  # encode to AAC
  cd $submission/test;
  echo "$submission"

  for dir in ./* ;do
    # iterate over track directories
    if [[ -d $dir ]];then
      encode "$dir";
    fi
  done
  cd ../..;
done
