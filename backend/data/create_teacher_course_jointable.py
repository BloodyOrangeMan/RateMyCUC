import psycopg2

# 创建PostgreSQL数据库连接
conn = psycopg2.connect(
    dbname="test",
    user="postgres",
    password="mysecretpassword",
    host="localhost",
    port=5432,
)

# 使用光标对象执行SQL查询
cur = conn.cursor()

# 对course表中的每一行进行处理
cur.execute("SELECT * FROM course;")
rows = cur.fetchall()

for row in rows:
    classID = row[0]
    teacher_names = row[6].split(',')
    for teacher in teacher_names:
        print(teacher)
        if (teacher == "无"):
            continue
        teacher_name, teacher_id = teacher.split('|')[0], teacher.split('|')[1]
        
        # 在teacher表中查找对应的教师ID
        cur.execute("SELECT id FROM teacher WHERE teacher.\"teacherName\" = %s;", (teacher_name,))
        teacher_id = cur.fetchone()
        
        # 如果找到教师ID，则将其插入到course_teachers_teacher表中
        if teacher_id:
            cur.execute("INSERT INTO course_teachers_teacher (\"courseClassID\", \"teacherId\") VALUES (%s, %s);", (classID, teacher_id[0]))

# 提交数据库事务
conn.commit()

# 关闭数据库连接
cur.close()
conn.close()
