FROM postgres:15.3

# 安装必要的软件包
RUN apt-get update && apt-get install -y \
  bison \
  flex \
  zlib1g \
  zlib1g-dev \
  pkg-config \
  make \
  libssl-dev \
  libreadline-dev \
  curl \
  build-essential \
  git \
  libclang-dev \
  postgresql-server-dev-15

# 安装Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# 设置环境变量
ENV PATH="/root/.cargo/bin:${PATH}"

# 安装cargo-pgrx
RUN cargo install cargo-pgrx --version 0.9.3

# 克隆ZomboDB仓库
RUN git clone https://github.com/zombodb/zombodb.git

# 安装ZomboDB
WORKDIR /zombodb
RUN cargo pgrx init --pg15=`which pg_config`
RUN cargo pgrx install --release
