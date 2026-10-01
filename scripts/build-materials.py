import json, sys, os
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

content=json.load(open(sys.argv[1],encoding='utf-8'))
out=sys.argv[2]; os.makedirs(out,exist_ok=True)
pdfmetrics.registerFont(TTFont('Body',r'C:\Windows\Fonts\segoeui.ttf'))
pdfmetrics.registerFont(TTFont('Heading',r'C:\Windows\Fonts\georgia.ttf'))
INK=HexColor('#193d2b'); PAPER=HexColor('#f6f5ed'); MUTED=HexColor('#526358'); LINE=HexColor('#d7ddce')
W,H=595.28,841.89; M=48
styles={
 'title':ParagraphStyle('title',fontName='Heading',fontSize=30,leading=37,textColor=INK,spaceAfter=20),
 'heading':ParagraphStyle('heading',fontName='Heading',fontSize=20,leading=26,textColor=INK),
 'body':ParagraphStyle('body',fontName='Body',fontSize=11,leading=18,textColor=MUTED),
 'small':ParagraphStyle('small',fontName='Body',fontSize=9,leading=14,textColor=MUTED),
 'checktitle':ParagraphStyle('checktitle',fontName='Heading',fontSize=16,leading=20,textColor=INK)
}
def text(c,s,y,style='body',width=W-2*M,x=M,gap=16):
 p=Paragraph(s.replace('–','-').replace('—','-'),styles[style]); _,h=p.wrap(width,H);p.drawOn(c,x,y-h);return y-h-gap
def page(c,n,label):
 c.setFillColor(PAPER);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(INK);c.setFont('Body',10);c.drawString(M,H-42,'ECMA.  /  ENTRE CONSTRUÇÃO E MEIO AMBIENTE')
 c.setStrokeColor(LINE);c.line(M,H-58,W-M,H-58);c.line(M,50,W-M,50)
 c.setFillColor(MUTED);c.setFont('Body',8);c.drawString(M,33,'Extensão 2026 - Engenharia Civil - Estudantes da Universidade FUMEC');c.drawRightString(W-M,33,f'{n:02d}')
 c.setFillColor(INK);c.setFont('Body',9);c.drawString(M,H-91,label.upper());return H-115
def box(c,heading,body,y):
 p=Paragraph(body,styles['body']);_,h=p.wrap(W-2*M-32,H)
 total=h+68;c.setFillColor(HexColor('#e5ead8'));c.rect(M,y-total,W-2*M,total,fill=1,stroke=0)
 text(c,heading,y-16,'heading',W-2*M-32,M+16);p.drawOn(c,M+16,y-total+15);return y-total-24

c=canvas.Canvas(os.path.join(out,'cartilha.pdf'),pagesize=(W,H));c.setTitle('Construção sustentável na escola - ECMA');c.setAuthor('Projeto de Extensão - estudantes de Engenharia Civil FUMEC')
y=page(c,1,'Cartilha educativa / segunda etapa')
y=text(c,'Construir um futuro<br/>começa na escola.',y-25,'title')
y=text(c,'Engenharia que sai da universidade e chega à escola.',y-4,'heading')
y=text(c,'Um roteiro para observar luz, ventilação, água, solo e materiais - e conversar sobre escolhas que fazem parte do cotidiano.',y-12)
y=box(c,'Como usar esta cartilha','Escolha um tema com a turma. Leia, observe o espaço e discuta as perguntas. As atividades são educativas e devem ser orientadas por um professor. Não autorizam reformas, intervenções técnicas ou manipulação de materiais perigosos.',y-12)
c.showPage()
y=page(c,2,'Um percurso para explorar');y=text(c,'Neste roteiro',y,'title')
for i,l in enumerate(content['lessons']):
 y=text(c,f'{i+1:02d}  {l["title"]}',y,'small')
 if y<90:raise ValueError('Sumário excedeu a página')
c.showPage()
for i,l in enumerate(content['lessons']):
 y=page(c,i+3,f'{i+1:02d} / '+l['category']);y=text(c,l['title'],y,'title');y=text(c,l['intro'],y)
 for section in l['sections']:
  y=text(c,section['title'],y-6,'heading');y=text(c,section['text'],y)
 y=box(c,'Uma atividade para a turma',l['activity'],y-6)
 y=text(c,'Para levar com você',y,'heading');y=text(c,l['takeaway'],y)
 if y<85:raise ValueError('Conteúdo excedeu a página: '+l['slug'])
 c.showPage()
y=page(c,len(content['lessons'])+3,'Cuidado, contexto e continuidade')
y=text(c,'Perguntar também é cuidar.',y,'title')
y=text(c,'Cada escola possui características e necessidades próprias. Este material não oferece certificação ambiental, diagnóstico de engenharia ou instruções para execução de obras.',y)
y=text(c,'Casa da Terra: uma referência externa',y,'heading')
y=text(c,'O contexto fornecido pelo grupo descreve um estudo associado à UNIFEI, com solo-cimento e incorporação de vidro moído. Não é um projeto do grupo da FUMEC. Os resultados dependem da mistura e dos ensaios; não se deve concluir que vidro sempre melhora um tijolo. O documento original e sua referência completa ainda precisam ser disponibilizados.',y)
y=text(c,'Fonte e autoria do material educativo',y,'heading')
y=text(c,'Conteúdo produzido para a plataforma ECMA, a partir do contexto e dos temas fornecidos pelo grupo do Projeto de Extensão 2026. Síntese educativa, sujeita à revisão acadêmica pelos responsáveis.',y)
y=text(c,'Instituições e consulta online',y,'heading')
y=text(c,'Universidade FUMEC: www.fumec.br<br/>Universidade Federal de Itajubá: unifei.edu.br<br/>Plataforma: fumec-sustentabilidade.vercel.app<br/><br/>Os links institucionais não substituem a referência completa de pesquisas e normas.',y)
c.showPage();c.save()

c=canvas.Canvas(os.path.join(out,'checklist.pdf'),pagesize=(W,H));c.setTitle('Minha escola é sustentável? - Roteiro de observação');c.setAuthor('Projeto de Extensão - estudantes de Engenharia Civil FUMEC')
y=page(c,1,'Checklist / roteiro de observação')
y=text(c,'Minha escola é sustentável?',y,'title');y=text(c,'Observe com a turma e marque: S = sim / A = ainda não / O = precisamos observar. Não é diagnóstico técnico ou certificação.',y)
for i,(_,title,question) in enumerate(content['checklist']):
 y=text(c,f'{i+1:02d}  {title}',y,'checktitle',gap=4);y=text(c,question,y,'small',W-2*M-105,gap=4)
 c.setStrokeColor(INK);c.setFillColor(INK);c.setFont('Body',8)
 for j,label in enumerate(['S','A','O']):
  x=W-M-83+j*30;c.rect(x,y+23,10,10,fill=0,stroke=1);c.drawString(x+2,y+10,label)
 c.setStrokeColor(LINE);c.line(M,y+3,W-M,y+3);y-=5
 if y<85:raise ValueError('Checklist excedeu a página')
c.showPage()
y=page(c,2,'Da observação à conversa');y=text(c,'Uma melhoria que podemos acompanhar.',y,'title')
for title,question in [('O que já funciona bem?','Registrem uma prática que a turma observou.'),('O que precisamos investigar?','Escolham uma pergunta e como buscar uma resposta.'),('Com quem vamos conversar?','Pensem em professores e gestão, sem registrar contatos pessoais.'),('Como vamos acompanhar?','Definam uma observação e um período para conversar de novo.')]:
 y=text(c,title,y,'heading');y=text(c,question,y,'small');c.setStrokeColor(LINE)
 for j in range(3):c.line(M,y-j*24,W-M,y-j*24)
 y-=60
y=text(c,'As respostas são educativas. Não registrem nomes de estudantes ou dados pessoais. Nenhuma alteração no edifício deve ser feita sem orientação e avaliação adequadas.',y,'small');c.showPage();c.save()
for filename in ['cartilha.pdf','checklist.pdf']:
 doc=PdfReader(os.path.join(out,filename));print(filename+': '+str(len(doc.pages))+' páginas; texto extraído e arquivos reabertos.')
