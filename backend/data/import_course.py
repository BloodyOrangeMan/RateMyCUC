import pandas as pd
from sqlalchemy import create_engine

# Load your CSV file into a pandas DataFrame
df = pd.read_csv('data.csv')

# Preprocess your data. For example, fill missing values:
df['classID'] = df.index + 1  # Generate classID using index. You might want to adjust this to suit your specific needs.
df['totalDifficulty'] = 0  # Fill with default value
df['totalGain'] = 0  # Fill with default value
df['totalRate'] = 0  # Fill with default value
df['numberOfRatings'] = 0  # Fill with default value

df = df.drop(columns=['campusName', 'courseNature', 'courseType', 'hasTest', 'isTest'])


# Connect to your database
engine = create_engine('postgresql://postgres:mysecretpassword@localhost:5432/test')

# Write your DataFrame to your table. This will replace all existing data!
df.to_sql('course', engine, if_exists='append', index=False)
