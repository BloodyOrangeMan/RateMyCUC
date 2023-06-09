import pandas as pd

# 假设csv_file是你的CSV文件的路径
csv_file = 'data.csv'

# 读取CSV文件
df = pd.read_csv(csv_file)

# 拆分teacherName字段
df = df.assign(teacherName=df['teacherName'].str.split(',')).explode('teacherName')

# 将teacherName字段拆分为2个新字段：teacherNameMain, teacherId
df[['teacherNameMain', 'teacherId']] = df['teacherName'].str.split('|', expand=True)

# 删除原始的teacherName字段，只保留 'teacherNameMain','teacherId' 这2列
df = df[['teacherNameMain', 'teacherId']]

# 保存到新的CSV文件
df.to_csv('new_csv_file.csv', index=False)
