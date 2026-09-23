insert into public.content_categories (name) values
  ('Aulas'),
  ('Vídeos'),
  ('Artigos'),
  ('PDFs'),
  ('Materiais'),
  ('Treinamentos')
on conflict (name) do nothing;

insert into public.specialists (name, specialty, bio, avatar_url, cover_url) values
  ('Akemi Tanaka', 'Face Spa e lifting manual', 'Especialista em técnicas de ativação facial com foco em presença, precisão e conforto.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'),
  ('Maitê Hayashi', 'Drenagem e protocolos relaxantes', 'Instrutora de rotinas de drenagem facial, preparação de sala e rituais sensoriais.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=240&q=80', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'),
  ('Renata Imai', 'Atendimento premium', 'Mentora de jornada da cliente, comunicação consultiva e experiência pós-protocolo.', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80'),
  ('Luiza Nomura', 'Marketing para licenciadas', 'Cria planos de conteúdo para serviços de estética premium com clareza e delicadeza.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80'),
  ('Camila Nakano', 'Protocolos avançados', 'Pesquisa sequências avançadas e adaptações seguras para diferentes perfis de pele.', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80');

insert into public.benefits (title, description, category, valid_until, code, image_url) values
  ('Kit de sala sensorial', 'Condição especial para montar uma ambientação Yugen com aroma e textura.', 'Parceiros', '2026-10-30', 'YUGENSALA15', 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80'),
  ('Banco de imagens institucionais', 'Seleção de imagens autorizadas para posts e materiais locais.', 'Materiais', '2026-12-31', 'ACESSO-YUGEN', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'),
  ('Encontro presencial regional', 'Pré-inscrição para turmas de imersão presencial com prioridade de licenciadas.', 'Eventos', '2026-11-18', 'REGIONAL26', 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80');
