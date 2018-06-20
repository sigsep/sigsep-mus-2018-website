
import pandas as pd
from urllib.request import urlopen
import numpy as np
import json


metrics = ['SDR', 'SIR', 'SAR', 'ISR']

targets = ['vocals', 'accompaniment', 'drums', 'bass', 'other']

oracles = [
    'IBM1', 'IBM2', 'IRM1', 'IRM2', 'MWF',
]


if __name__ == '__main__':

    pandas_url = "https://github.com/sigsep/sigsep-mus-2018-analysis/releases/download/v1.0.0/sisec18_mus_30s.pandas"

    # Open URL
    raw_data = urlopen(pandas_url)
    # Load into Pandas Dataframes
    df = pd.read_pickle(raw_data)
    # destingish oracles from non-oracle methods

    # Aggregate all frames of each track using the median
    # Note that `nan` values are skipped by default
    df = df.groupby(
        ['method', 'track', 'target', 'metric']
    ).median().reset_index()

    headers = {}

    headers['tracks'] = list(
        df['track'].astype('category').cat.categories
    )

    headers['methods'] = list(
        df['method'].astype('category').cat.categories
    )
    headers['metrics'] = list(
        df['metric'].astype('category').cat.categories
    )
    headers['targets'] = list(
        df['target'].astype('category').cat.categories
    )

    with open("../src/headers.js", 'w') as f:
        json.dump(headers, f)

    # Encode names into IDs
    df['track_id'] = df['track'].astype('category').cat.codes
    df['target_id'] = df['target'].astype('category').cat.codes
    df['method_id'] = df['method'].astype('category').cat.codes
    df['metric_id'] = df['metric'].astype('category').cat.codes

    # write out headers
    df.to_csv(
        path_or_buf="../static/scores.csv",
        sep=",",
        header=True,
        columns=[
            'track_id',
            'target_id',
            'method_id',
            'metric_id',
            'score'
        ],
        index=False,
        index_label=None
    )
