import { Declaracao } from '../../models';
import { conteudoSelado, sha256 } from './declarations.service';
import { notaPonderada } from './recognition.service';
import { diasAteAniversario } from './users.service';

describe('lógica de cultura e declarações', () => {
  it('calcula dias até ao aniversário, incluindo a passagem de ano', () => {
    const hoje = new Date(2026, 9, 20); // 20 Out 2026
    expect(diasAteAniversario('1990-10-20', hoje)).toBe(0);
    expect(diasAteAniversario('1990-10-23', hoje)).toBe(3);
    expect(diasAteAniversario('1990-10-19', hoje)).toBe(364);
    expect(diasAteAniversario('1990-01-01', hoje)).toBe(73);
  });

  it('calcula a nota final como média ponderada', () => {
    expect(notaPonderada([{ nome: 'a', peso: 75, nota: 10 }, { nome: 'b', peso: 25, nota: 6 }])).toBe(9);
    expect(notaPonderada([])).toBe(0);
  });

  it('o selo da declaração detecta qualquer alteração ao texto', async () => {
    const d: Declaracao = {
      id: 'x', codigo: 'ENDE-DEC-000001', tipo: 'serviço', finalidade: 'teste', solicitanteId: 'u', dataPedido: '', estado: 'assinada',
      texto: 'Declara-se que...', assinatura: { assinanteNome: 'RH', assinanteCargo: 'Dir.', data: '2026-10-20T10:00:00Z', hash: '' },
    };
    const hash = await sha256(conteudoSelado(d));
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
    expect(await sha256(conteudoSelado({ ...d, texto: 'Declara-se que... (alterado)' }))).not.toBe(hash);
  });
});
