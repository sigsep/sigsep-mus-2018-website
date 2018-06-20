#!/bin/bash
DATADIR=../data
wget https://zenodo.org/record/1256003/files/MUSDB18-30-WAV.zip?download=1 -O MUSDB18-30-WAV.zip
unzip MUSDB18-30-WAV.zip -d REF
rm -r REF/train
mv REF/train $DATADIR/AUDIO/REF
rm MUSDB18-30-WAV.zip

wget https://zenodo.org/record/1256003/files/SiSEC18-MUS-30-WAV.zip?download=1 -O SiSEC18-MUS-30-WAV.zip
unzip SiSEC18-MUS-30-WAV.zip -d SUBMISSIONS
mv SUBMISSIONS/* $DATADIR/AUDIO/*
rm SiSEC18-MUS-30-WAV.zip
