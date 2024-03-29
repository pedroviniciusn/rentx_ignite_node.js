# Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN**
- O usuário responsável pelo cadastro deve ser um administrador.
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão com disponobilidade.

# Listagem de carros 

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificações no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- O usuário responsável pelo o cadastro deve ser um administrador.
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

# Cadastro de imagem do carro

**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário responsável pelo o cadastro deve ser um administrador.
- O usuário deve poder cadastrar mais de uma imagem para o memso carro.

# Aluguel de carro

**RF**
- Deve ser possível cadastrar o aluguel.

**RN**
- O aluguel deve ter duração minima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Listagem de algueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- O usuário deve estar logado na aplicação

# Devolução de carro

**RF**
- Deve ser possível realizar a devolução de um carro.

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somada ao total do aluguel.

# Recuperar senha 

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- O usuário precisa informar uma nova senha.
- O link enviado para recuperação deve expirar em 3 horas.