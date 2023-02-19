import json

data = json.load(open("mapa.json"))
template = open("template.html").read()
cidades_keys = {cidade["id"]: cidade for cidade in data["cidades"]}
cidades = data["cidades"]
cidades.sort(key=lambda x: x["nome"])


def gera_link(cidade):
    return f'<li><a href="#{cidade["id"]}">{cidade["nome"]}</a></li>'


def gera_mapa(cidade):
    ligacoes = filter(
        lambda x: x["origem"] == cidade["id"] or x["destino"] == cidade["id"],
        data["ligações"],
    )

    ligacoes_text = ""
    for ligacao in ligacoes:
        origem = cidades_keys[ligacao["origem"]]["nome"]
        destino = cidades_keys[ligacao["destino"]]["nome"]
        distancia = ligacao["distância"]
        ligacoes_text += f"<li><a href=\"#{ligacao['origem']}\">{origem}</a> &mdash; <a href=\"#{ligacao['destino']}\"/>{destino}</a> - {distancia}km</li>"

    return f"""
        <a name="{cidade["id"]}" />
        <h3>{cidade["nome"]}</h3>
        <p><b>População:</b> {cidade["população"]}</p>
        <p><b>Distrito:</b> {cidade["distrito"]}</p>
        <p>{cidade["descrição"]}</p>
        <address>[<a href="#indice">Voltar ao índice</a>]</address>
        <h4>Estradas: </h4>
        <ul>
            {ligacoes_text}
        </ul>
    """


links = list(map(gera_link, cidades))
mapa = list(map(gera_mapa, cidades))

html = template.replace("<!-- Lista com o índice -->", "\n".join(links)).replace(
    "<!-- Informação das cidades -->", "\n".join(mapa)
)

# TODO: Colocar nome da cidade com distância. Esta informação está nas ligações

with open("mapa.html", "w") as f:
    f.write(html)
