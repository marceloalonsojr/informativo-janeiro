import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Globe, ArrowRight, Menu, X, Copy, Check, Image as ImageIcon, Instagram, Facebook, Mail, User, HandHeart } from 'lucide-react';

// Ícone personalizado do WhatsApp
const WhatsAppIcon = ({ size = 24, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

// Componente para imagem com fallback de erro
const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`${className} bg-stone-200 flex flex-col items-center justify-center text-stone-500 border-2 border-dashed border-stone-300 p-4 text-center`}>
        <ImageIcon size={32} className="mb-2 opacity-50" />
        <span className="text-xs font-mono break-all">{src}</span>
        <span className="text-[10px] mt-1 text-stone-400">(Imagem não encontrada)</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
    />
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal do PIX
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false); // Modal de Oração
  const [copied, setCopied] = useState(false);

  // Mapeamento das imagens
  const images = {
    heroGroup: "IMG_20251105_081705788_HDR_AE.jpg",
    woodPanel: "IMG_20251128_115359746.jpg",
    canoe: "IMG_20251128_115304906.jpg",
    totem: "IMG_20251128_115212950.jpg",
    shell: "IMG_20251128_115324611_HDR_AE.jpg",
    volcano: "IMG_20251105_090023019.jpg",
    kidsFruit: "IMG_20251104_101548670.jpg",
    soccer: "IMG_20251102_172913274_HDR.jpg",
    volcanoSmoke: "IMG_20251105_085537762.jpg",
    extraLandscape: "IMG_20251128_115351283.jpg"
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyPix = () => {
    const pixKey = "4301947894";
    const textArea = document.createElement("textarea");
    textArea.value = pixKey;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar', err);
    }
    document.body.removeChild(textArea);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPrayerModal = () => setIsPrayerModalOpen(true);
  const closePrayerModal = () => setIsPrayerModalOpen(false);

  // Itens do menu
  const menuItems = [
    { label: 'Informativo', id: 'informativo' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Participe', id: 'participe' }
  ];

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-teal-200 selection:text-teal-900 relative">
      
      {/* Navegação */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`text-2xl font-serif font-bold tracking-tighter transition-colors ${isScrolled ? 'text-teal-900' : 'text-white drop-shadow-md'}`}>
            Tradução da <span className="text-teal-500">Bíblia</span>
          </div>
          
          <div className="hidden lg:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <a key={item.label} href={`#${item.id}`} className={`font-medium hover:text-teal-500 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white/90 drop-shadow-sm'}`}>
                {item.label}
              </a>
            ))}
            <button 
              onClick={openModal}
              className={`px-6 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-teal-500/30 ${isScrolled ? 'bg-teal-600 hover:bg-teal-700 text-white' : 'bg-white text-teal-700 hover:bg-stone-100'}`}
            >
              Apoiar
            </button>
          </div>

          <button className="lg:hidden text-teal-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-stone-800' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-6 text-xl text-stone-800 font-medium text-center">
            {menuItems.map((item) => (
              <a key={item.label} href={`#${item.id}`} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            ))}
             <button 
              onClick={() => { openModal(); setMobileMenuOpen(false); }}
              className="bg-teal-600 text-white py-3 rounded-xl mt-4"
            >
              Quero Apoiar
            </button>
          </div>
        </div>
      )}

      {/* Hero / Capa */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src={images.heroGroup} 
            alt="Grupo de pessoas na praia sorrindo" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-black/30"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-20">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] mb-6 border border-white/20 uppercase">
            Informativo de Fevereiro
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] max-w-5xl mx-auto drop-shadow-2xl">
            A Palavra de Deus na <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500 italic">Língua do Coração</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            "Quando Deus fala nossa língua, a mensagem não toca apenas a mente, ela transforma a alma."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('informativo').scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-teal-500/40 flex items-center justify-center gap-2"
            >
              Acesse o informativo <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Seção Informativo */}
      <section id="informativo" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Coluna de Texto - Informativo */}
            <div className="lg:w-3/5 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-100 p-3 rounded-full text-teal-700">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-teal-700 font-bold tracking-wide uppercase text-sm">Carta aos Parceiros</h3>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8 leading-tight">
                Gratidão e Avanço no Reino
              </h2>

              <div className="prose prose-lg text-stone-600 text-justify leading-relaxed">
                <p className="mb-6">
                  Queridos amigos, gostaria de começar este informativo expressando minha gratidão ao Senhor, que, por meio de Sua Palavra, tem sustentado meus dias, providenciado e revelado Sua graça e amor de maneira extraordinária!
                </p>
                <p className="mb-6">
                  A cada dia, tenho presenciado e testemunhado o poder do evangelho, bem como os desafios que vêm com uma vida de devoção. Amigos, Satanás não está nada contente com aqueles que caminham em obediência à vontade do Senhor; ele não se alegra com você, que tem colocado seu coração não nas riquezas, mas no reino de Deus. E, em meio a todas essas questões, dificuldades surgirão, armadilhas serão lançadas para nos desviar do verdadeiro propósito: encontrar alegria em viver uma vida de obediência a Ele.
                </p>
                <blockquote className="border-l-4 border-teal-500 pl-6 italic text-stone-700 font-serif my-8 bg-stone-50 py-4 pr-4 rounded-r-lg">
                  "Minha oração é que o ladrão da alegria não tenha domínio sobre nossas vidas, que o Senhor nos revista com Sua proteção e bondade. Lembrem-se, o Senhor é e sempre será fiel; continuem crendo em Suas promessas e obedecendo ao Seu chamado."
                </blockquote>
                
                <h3 className="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Escola de Missões em Férias (EMF)</h3>
                <p className="mb-6">
                  No mês de janeiro, participei da EMF. Durante esses 20 dias, tivemos um tempo teórico, onde os alunos foram treinados em ferramentas de evangelismo, como: dança, teatro, louvor e porte. Além disso, foram ministradas aulas para o aperfeiçoamento do caráter, abordando temas como: Paternidade de Deus, Sexualidade, Devoção, Coração Missionário de Deus e Vocação. Essas aulas visam preparar os alunos para a vida, o engajamento na Grande Comissão e as próximas fases de suas jornadas.
                </p>

                <h3 className="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Prática em Indaiatuba</h3>
                <p className="mb-6">
                  Uma parte importante foi o período prático, em que eu e mais três obreiros lideramos uma equipe de 14 jovens. Fomos para a cidade de Indaiatuba, onde a igreja "Nazareno" abriu suas portas para nos receber durante uma semana.
                </p>
                <p className="mb-6">
                  Durante esse tempo, visitamos casas de recuperação, realizamos evangelismos na praça, na feira e com crianças. Também conduzimos treinamentos de evangelismo com os jovens da igreja e realizamos um grande workshop sobre evangelismo para toda a congregação. Durante as evangelizações e visitas, muitas pessoas foram tocadas pelo amor de Cristo.
                </p>

                {/* Nova Seção: Próximos Passos */}
                <h3 className="text-2xl font-serif font-bold text-stone-800 mt-10 mb-4">Próximos Passos</h3>
                <p className="mb-6">
                  Em fevereiro, começarei a trabalhar em tempo integral com a tribo Kamaiura, que atualmente reside em São Paulo e está se dedicando arduamente à tradução da Bíblia para sua língua materna.
                </p>

                <div className="bg-stone-50 border-l-4 border-teal-500 p-6 my-8 rounded-r-lg shadow-sm">
                  <h4 className="font-bold text-stone-900 mb-4 text-lg">Objetivos do Ano:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-teal-100 p-1 rounded-full mt-0.5"><Check className="text-teal-600" size={14} /></div>
                      <span className="text-stone-700 font-medium">Concluir todas as revisões dos livros de Marcos, Tiago e Filemom</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-teal-100 p-1 rounded-full mt-0.5"><Check className="text-teal-600" size={14} /></div>
                      <span className="text-stone-700 font-medium">Realizar a gravação final dos livros</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-teal-100 p-1 rounded-full mt-0.5"><Check className="text-teal-600" size={14} /></div>
                      <span className="text-stone-700 font-medium">Publicar e distribuir as obras na tribo Kamaiura</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-teal-100 p-1 rounded-full mt-0.5"><Check className="text-teal-600" size={14} /></div>
                      <span className="text-stone-700 font-medium">Fazer um curso de Hebraico para aprofundar conhecimento e qualidade na tradução</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Coluna de Imagens - Ilustrando o texto */}
            <div className="lg:w-2/5 order-1 lg:order-2 space-y-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-teal-100 rounded-3xl transform rotate-2"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback src={images.soccer} alt="Futebol com crianças" className="w-full h-72 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium text-sm">Evangelismo e esporte com crianças</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <ImageWithFallback src={images.kidsFruit} alt="Crianças" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 bg-stone-100 flex items-center justify-center text-center p-4">
                  <div>
                    <span className="block text-3xl font-bold text-teal-600 mb-1">20</span>
                    <span className="text-sm text-stone-600 font-medium">Dias de treinamento intensivo</span>
                  </div>
                </div>
              </div>

               <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <h4 className="font-bold text-stone-800 mb-3 flex items-center gap-2">
                  <Check size={18} className="text-teal-500" />
                  Atividades Realizadas
                </h4>
                <ul className="space-y-2 text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2"></span>
                    Evangelismo em praças e feiras
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2"></span>
                    Visitas a casas de recuperação
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2"></span>
                    Workshops de capacitação
                  </li>
                   <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2"></span>
                    Teatro e Dança
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEÇÃO: SOBRE MIM */}
      <section id="sobre" className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-stone-200 p-3 rounded-full text-stone-700">
                <User size={24} />
              </div>
              <h3 className="text-stone-500 font-bold tracking-wide uppercase text-sm">Quem sou eu</h3>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-2 text-center">
              Marcelo Alonso Jr.
            </h2>
            <p className="text-teal-600 font-medium text-lg text-center mb-10">JOCUM – Jovens com Uma Missão</p>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                 <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg relative">
                      <ImageWithFallback src={images.extraLandscape} alt="Marcelo Alonso Jr." className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-6">
                        <span className="text-white font-serif italic text-xl">"Vem, Senhor Jesus"</span>
                      </div>
                    </div>
                 </div>

                 <div className="md:w-2/3 prose prose-stone text-justify leading-relaxed text-stone-600">
                    <p>
                      Tenho 27 anos e há três anos sirvo em missões através da JOCUM (Jovens com Uma Missão), atuando principalmente na tradução da Bíblia, além de evangelismo e discipulado entre povos e culturas diversas.
                    </p>
                    <p>
                      Em 2022, a palavra <strong>Maranata</strong> — "Ora vem, Senhor Jesus" — deixou de ser apenas uma expressão bíblica e passou a queimar profundamente em meu coração. Não como um desejo passivo pela volta de Cristo, mas como uma convocação à obediência. Entendi que desejar a vinda do Senhor está diretamente ligado a viver para apressá-la, alcançando povos, línguas e nações com a revelação do Evangelho.
                    </p>
                    <p>
                      Esse chamado tem se expressado de forma prática através da tradução das Escrituras, servindo comunidades que ainda não têm acesso pleno à Palavra de Deus em sua língua materna. A tradução não é apenas um trabalho linguístico, mas um ato missionário: permitir que Cristo fale ao coração de cada povo dentro da sua própria cultura.
                    </p>
                    <p>
                      Além disso, seguimos comprometidos com o evangelismo relacional e o discipulado, crendo que a missão não termina na conversão, mas no estabelecimento de discípulos que vivam o Reino de Deus em suas realidades locais.
                    </p>
                    <p className="font-medium text-stone-800 italic border-l-2 border-teal-500 pl-4">
                      "Minha oração é que o corpo de Cristo seja fortalecido, que tradutores, líderes e igrejas locais sejam levantados pelo Espírito Santo e que cada povo possa ouvir, compreender e responder ao chamado do Rei que está voltando."
                    </p>
                    <p className="text-right font-bold text-stone-900 mt-4">
                      Seguimos firmes, com os olhos no campo e o coração na promessa:<br/>
                      <span className="text-teal-600">Maranata. Vem, Senhor Jesus.</span>
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="participe" className="py-24 bg-stone-100 border-t border-stone-200">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <BookOpen size={56} className="text-teal-600 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
            A História Ainda Não Acabou
          </h2>
          <p className="text-xl text-stone-600 mb-12 leading-relaxed">
            Você pode ser parte da resposta de oração. Junte-se a nós nesta caminhada de fé.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button 
              onClick={openPrayerModal}
              className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Quero Orar
            </button>
            <button 
              onClick={openModal}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-teal-500/40 hover:-translate-y-1"
            >
              Quero Contribuir
            </button>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-white tracking-tighter">
             Tradução da <span className="text-teal-500">Bíblia</span>
          </div>
          <div className="text-sm text-center md:text-left">
            © 2025 Projeto Tradução. Imagens reais do campo missionário.
          </div>
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/marcelo_alonsojr?igsh=YTdxYm4zeHVuanp0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white hover:scale-110 transition-all flex items-center gap-2"
              title="Siga no Instagram"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/share/1AT3Jjtjin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all"
              title="Siga no Facebook"
            >
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://wa.me/5511958139868" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all"
              title="Conversar no WhatsApp"
            >
              <WhatsAppIcon size={24} />
              <span className="sr-only">WhatsApp</span>
            </a>
            <a href="mailto:contato@exemplo.com" className="hover:text-white hover:scale-110 transition-all">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL DO PIX */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up transform scale-100 overflow-hidden">
            {/* Decoração de fundo do modal */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8 mt-2">
              <div className="bg-teal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 ring-4 ring-teal-50">
                <Heart size={36} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Faça sua Contribuição</h3>
              <p className="text-stone-500 mt-2 text-sm leading-relaxed">
                Seu apoio acelera a tradução e leva a Palavra a quem nunca ouviu.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                 <Globe size={100} />
              </div>
              
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Chave Pix</div>
              <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <code className="text-xl font-mono font-bold text-stone-800 break-all">4301947894</code>
                <button 
                  onClick={handleCopyPix}
                  className={`p-3 rounded-lg transition-all flex-shrink-0 ${copied ? 'bg-green-100 text-green-700' : 'bg-teal-50 hover:bg-teal-100 text-teal-700'}`}
                  title="Copiar chave Pix"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              {copied && <div className="text-green-600 text-xs mt-2 font-bold flex items-center gap-1 justify-center"><Check size={12}/> Chave copiada!</div>}
            </div>

            <div className="text-center pt-2 pb-4">
              <div className="text-xs text-stone-400 uppercase tracking-widest mb-1">Titular da conta</div>
              <div className="font-bold text-stone-800 text-lg flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                Marcelo Alonso Junior
              </div>
            </div>

            <button 
              onClick={closeModal}
              className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-stone-900/20 active:scale-95"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE ORAÇÃO */}
      {isPrayerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm transition-opacity" onClick={closePrayerModal}></div>
          
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up transform scale-100 overflow-hidden">
            {/* Decoração de fundo do modal */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-stone-400 to-stone-600"></div>
            
            <button 
              onClick={closePrayerModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-8 mt-2">
              <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-600 ring-4 ring-stone-50">
                <HandHeart size={36} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Motivos de Oração</h3>
              <p className="text-stone-500 mt-2 text-sm leading-relaxed">
                "A oração do justo é poderosa e eficaz." (Tiago 5:16)
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4 items-start p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <div className="mt-1 text-teal-600"><Check size={18} /></div>
                <div className="text-stone-700 text-sm">Pelo <strong>projeto de tradução</strong> com os Kamaiuras.</div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <div className="mt-1 text-teal-600"><Check size={18} /></div>
                <div className="text-stone-700 text-sm">Pela <strong>cobertura espiritual</strong> da nossa base da Jocum.</div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <div className="mt-1 text-teal-600"><Check size={18} /></div>
                <div className="text-stone-700 text-sm">Por <strong>questões financeiras</strong> e provisão.</div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-100">
                <div className="mt-1 text-teal-600"><Heart size={18} /></div>
                <div className="text-stone-700 text-sm">
                  Pelo meu <strong>casamento com a Thais</strong>. Estamos a sete meses da cerimônia e precisamos de discernimento para os próximos passos e mentores para nos acompanhar.
                </div>
              </div>
            </div>

            <button 
              onClick={closePrayerModal}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg hover:shadow-stone-900/20 active:scale-95"
            >
              Vou Orar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;