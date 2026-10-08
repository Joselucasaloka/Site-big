import { useState, useMemo } from 'react';
import { Search, Plus, Eye, Flame, Utensils, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface MenuPortfolioProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

type CategoryFilter = 'todos' | 'burguers' | 'smash' | 'combos' | 'entradas' | 'sobremesas' | 'bebidas' | 'cervejas';

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos os Itens' },
  { id: 'burguers', label: 'Burguers Artesanais' },
  { id: 'smash', label: 'Smash Burguers' },
  { id: 'combos', label: 'Combos Especiais' },
  { id: 'entradas', label: 'Entradas & Skillets' },
  { id: 'sobremesas', label: 'Sobremesas & Shakes' },
  { id: 'cervejas', label: 'Chopp & Cervejas' },
  { id: 'bebidas', label: 'Drinks & Bebidas' },
];

export function MenuPortfolio({ onSelectItem, onQuickAdd }: MenuPortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesQuery =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-20 bg-neutral-950 text-neutral-100 border-b border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <div className="text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
              PORTFÓLIO GASTRONÔMICO
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1">
              Cardápio Completo da Casa
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Cada hambúrguer é preparado com blend fresco moído diariamente, queijos nobres e pães selados na manteiga. Escolha seu favorito ou monte seu combo.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome ou ingrediente..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Segmented control button row) */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850 border border-neutral-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30">
            <Utensils className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-base text-neutral-300 font-medium">Nenhum item encontrado com esses filtros</p>
            <p className="text-xs text-neutral-500 mt-1">Tente buscar por "smash", "costela", "bacon" ou selecione outra categoria.</p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-400 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-850"
            >
              Redefinir Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-neutral-700 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60"
              >
                {/* Image and quick badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed kicker on top */}
                  {item.highlight && (
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30 text-[11px] font-mono font-medium text-amber-400">
                      {item.highlight}
                    </div>
                  )}

                  {/* Price Tag pinned to corner */}
                  <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-sm font-mono font-bold text-amber-400">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Ingredients Clean Unboxed List */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <div className="text-[11px] font-mono text-neutral-500 mb-1.5 uppercase">
                      Ingredientes principais
                    </div>
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-neutral-300">
                      {item.ingredients.map((ing, idx) => (
                        <span key={idx} className="flex items-center gap-1">
                          <span>{ing}</span>
                          {idx < item.ingredients.length - 1 && (
                            <span aria-hidden="true" className="text-neutral-600">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-neutral-300 bg-neutral-850 hover:bg-neutral-800 border border-neutral-750 rounded-xl transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Detalhes</span>
                    </button>

                    <button
                      onClick={() => onQuickAdd(item)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer active:scale-95 shadow-md shadow-amber-500/10"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
