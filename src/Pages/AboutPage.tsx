const FEATURES = [
  { title: 'Ekle', text: 'Başlık, açıklama, öncelik ve son tarih ile yeni görev oluşturun.' },
  { title: 'Listele', text: 'Görevleri duruma göre filtreleyin, arayın ve farklı ölçütlere göre sıralayın.' },
  { title: 'Güncelle', text: 'Görevleri satır içinde düzenleyin veya tamamlandı olarak işaretleyin.' },
  { title: 'Sil', text: 'Onay adımıyla tek bir görevi ya da tüm tamamlananları silin.' },
]

const STACK = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'LocalStorage']

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Proje hakkında</h2>
        <p className="mt-3 leading-relaxed text-slate-600">
          Görev Defteri, Software Persona web geliştirme eğitimi kapsamında hazırlanmış bir yapılacaklar listesi
          uygulamasıdır. Temel CRUD işlemlerini (ekle, listele, güncelle, sil) modern bir React mimarisiyle uygular.
          Veriler tarayıcınızın LocalStorage alanında saklanır; herhangi bir sunucuya gönderilmez.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{feature.text}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="mb-3 font-semibold text-slate-900">Kullanılan teknolojiler</h3>
        <ul className="flex flex-wrap gap-2">
          {STACK.map((item) => (
            <li key={item} className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <a
        href="#/"
        className="inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
      >
        Görevlere dön
      </a>
    </div>
  )
}
