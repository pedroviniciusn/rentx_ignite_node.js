import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (!categoryAlreadyExists) {
    categoriesRepository.create({ name, description });

    return res.status(201).json({ message: 'Categoria criado com sucesso' });
  }
  return res.json({ error: 'Categoria já está cadastrada' });
});

categoriesRoutes.get('/', (req, res) => {
  const all = categoriesRepository.list();

  return res.json({ all });
});

export { categoriesRoutes };
