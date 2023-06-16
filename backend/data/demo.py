import pandas as pd
from sqlalchemy import create_engine

# 使用SQLAlchemy创建一个引擎
engine = create_engine('postgresql://postgres:mysecretpassword@localhost:5432/test')

# 读取CSV文件，只读取'teacherName'列
df = pd.read_csv('teacher_no_duplicates.csv', names=['id', 'teacherName'], usecols=['teacherName'])

# 将DataFrame写入到teacher表，注意设置if_exists参数为'append'，这样新的数据会被添加到表的尾部，而不是覆盖原有数据
df.to_sql('teacher', engine, if_exists='append', index=False)
