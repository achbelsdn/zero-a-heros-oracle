import{L as e,d as t,n,z as r}from"./createLucideIcon-DGh7nqS1.js";import{t as i}from"./shell-D6cGu7mX.js";import{n as a}from"./rich-DRB7Amwo.js";import{t as o}from"./lessons-jZZFVfyr.js";var s=r(e(),1),c=[{id:`verbe`,lessonId:`terrain`,title:`Le verbe du sujet`,syntax:`-- afficher un tableau, sans paramètre  →  VIEW
-- retourner un nombre              →  FUNCTION … RETURN NUMBER
-- mettre à jour / insérer          →  PROCEDURE
-- empêcher ou remplir tout seul    →  TRIGGER
-- afficher en parcourant           →  BEGIN … FOR rec IN (…) LOOP`,remember:[`Le nom écrit sur le sujet se recopie tel quel.`,`Un script PL/SQL stocké se termine par END; puis /.`,`Les tables mères se créent avant les clés étrangères.`],traps:[`Pseudo-code en français : zéro point de syntaxe.`,`GO n'existe pas. LIMIT non plus. TOP non plus.`]},{id:`create-table`,lessonId:`tables`,title:`CREATE TABLE`,syntax:`CREATE TABLE comments (
  id_comment NUMBER PRIMARY KEY,
  note       NUMBER NOT NULL,
  id_content NUMBER NOT NULL,
  CONSTRAINT fk_com_content
    FOREIGN KEY (id_content) REFERENCES contents (id_content),
  CONSTRAINT ck_com_note CHECK (note BETWEEN 0 AND 5)
);`,remember:[`NUMBER, VARCHAR2(n), DATE, CLOB.`,`BOOLEAN n'est pas un type de colonne dans ce cours.`,`CHECK ne lit que la ligne en cours.`],traps:[`INT, STRING, AUTO_INCREMENT : ce n'est pas Oracle.`,`VARCHAR2 sans taille ne compile pas.`]},{id:`alter`,lessonId:`alter`,title:`ALTER et renommage`,syntax:`ALTER TABLE employees
  ADD CONSTRAINT ck_emp_salaire CHECK (salaire >= 33500);

ALTER TABLE ancienne RENAME TO nouvelle;`,remember:[`UPDATE change les lignes. ALTER change la structure.`,`Oracle n'a pas RENAME TABLE … TO (ça, c'est MySQL).`],traps:[`Suis le chiffre du sujet même s'il contredit le DEFAULT.`]},{id:`sequence`,lessonId:`lignes`,title:`Séquence, DELETE, TRUNCATE`,syntax:`CREATE SEQUENCE seq_employes_id
  START WITH 1 INCREMENT BY 1
  MAXVALUE 1000000 CYCLE;

-- M100, M110, M120
:NEW.id := 'M' || seq_matiere.NEXTVAL;

DELETE FROM employe;   -- lignes, table conservée, ROLLBACK possible
TRUNCATE TABLE employe; -- DDL, pas de trigger, pas de ROLLBACK`,remember:[`NEXTVAL avance, CURRVAL relit.`,`CYCLE sans MAXVALUE est refusé.`,`DELETE sans WHERE vide la table, il ne la détruit pas.`],traps:[`Une séquence ne produit pas de lettres. Le M se concatène.`]},{id:`select`,lessonId:`requetes`,title:`SELECT d'examen`,syntax:`SELECT COUNT(*) INTO v_n FROM t WHERE id = p_id;

SELECT titre FROM contenu
 ORDER BY date_creation DESC
 FETCH FIRST 5 ROWS ONLY;

-- TRUNC(15.9) = 15     ROUND(15.9) = 16
-- NVL(moyenne, 0)      LOWER(statut) = 'valide'`,remember:[`Dans PL/SQL, SELECT nu interdit : INTO ou curseur.`,`DISTINCT n'efface rien et ne trie pas.`,`LEFT JOIN + COUNT(colonne de droite) garde les zéros.`],traps:[`TRUNC coupe. Il n'arrondit pas. Ce n'est pas TRUNCATE.`]},{id:`vue`,lessonId:`vues`,title:`Vue`,syntax:`CREATE OR REPLACE VIEW vue_contents AS
SELECT c.title, t.name AS type_contenu,
       COUNT(cm.id_comment) AS nb
  FROM contents c
  JOIN types_contents t ON t.id_type_content = c.id_type_content
  LEFT JOIN comments cm ON cm.id_content = c.id_content
 GROUP BY c.id_content, c.title, t.name;`,remember:[`Pas de paramètre. S'il y en a un, c'est une fonction.`,`WHERE filtre avant l'agrégat, HAVING après.`,`OR REPLACE évite « name is already used ».`],traps:[`JOIN interne sur les commentaires efface les contenus à 0.`]},{id:`variables`,lessonId:`blocs`,title:`Variables`,syntax:`v_id NUMBER(4);                         -- ok
v_x VARCHAR2(10);                       -- une par ligne
v_d DATE NOT NULL := SYSDATE;           -- NOT NULL initialisé
v_ok BOOLEAN := TRUE;                   -- pas 1
v_nom users.name%TYPE;
TYPE t IS TABLE OF VARCHAR2(20) INDEX BY BINARY_INTEGER;`,remember:[`EXCEPTION est la section d'erreurs. Pas CATCH, pas TRY.`,`%TYPE suit la colonne.`,`INDEX BY décrit un tableau en mémoire, pas un index SQL.`],traps:[`v_a, v_b NUMBER; est faux.`,`BOOLEAN := 1 est faux.`]},{id:`boucles`,lessonId:`controle`,title:`IF et boucles`,syntax:`IF v_n > 0 THEN
  NULL;
ELSIF v_n = 0 THEN
  NULL;
END IF;

FOR i IN 1 .. 5 LOOP
  NULL;
END LOOP;

FOR rec IN (SELECT titre FROM contenu) LOOP
  DBMS_OUTPUT.PUT_LINE(rec.titre);
END LOOP;`,remember:[`Nombre précis de tours : FOR.`,`ELSIF, pas ELSE IF.`,`PUT_LINE est la façon d'afficher sur la copie.`],traps:[`REPEAT n'existe pas.`,`SELECT INTO explose s'il y a 0 ou plusieurs lignes.`]},{id:`raise`,lessonId:`exceptions`,title:`Erreurs`,syntax:`IF salaire <= 0 THEN
  RAISE_APPLICATION_ERROR(-20001, 'Salaire invalide.');
END IF;

UPDATE users SET id_language = p_lang WHERE id_user = p_id;
IF SQL%ROWCOUNT = 0 THEN
  RAISE_APPLICATION_ERROR(-20011, 'Introuvable.');
END IF;`,remember:[`Codes applicatifs : de -20000 à -20999.`,`Exception non gérée dans un BEFORE INSERT : l'insertion est annulée.`,`N'avale pas WHEN OTHERS THEN NULL.`],traps:[`RETURN 'erreur' ne lève pas une erreur Oracle.`]},{id:`fonction`,lessonId:`fonctions`,title:`Fonction`,syntax:`CREATE OR REPLACE FUNCTION nbcontentsbylanguage (
  v_id_language IN languages.id_language%TYPE
) RETURN NUMBER
IS
  v_total NUMBER;
BEGIN
  SELECT COUNT(*) INTO v_total
    FROM contents
   WHERE id_language = v_id_language
     AND status = 'Validé';
  RETURN v_total;
END;
/`,remember:[`RETURN type se place avant IS.`,`Un seul scalaire. L'appel d'essai : SELECT f(1) FROM dual;`,`Le COUNT passe par INTO.`],traps:[`RETURNS est le mot de SQL Server.`,`Une procédure ne porte pas RETURN NUMBER.`]},{id:`procedure`,lessonId:`procedures`,title:`Procédure`,syntax:`CREATE OR REPLACE PROCEDURE mise_a_jour_salaire (
  p_id IN employees.id%TYPE,
  p_nouveau_salaire IN NUMBER
) IS
BEGIN
  IF p_nouveau_salaire < 33500 THEN
    RAISE_APPLICATION_ERROR(-20002, 'Sous le plancher.');
  END IF;
  UPDATE employees SET salaire = p_nouveau_salaire WHERE id = p_id;
END;
/

BEGIN
  mise_a_jour_salaire(1, 40000);
END;
/`,remember:[`Pas de RETURN dans la signature.`,`Le test métier se fait avant l'écriture.`,`L'appel est un bloc BEGIN … END, pas un SELECT.`],traps:[`Oublier NEXTVAL quand le sujet demande la séquence.`]},{id:`trigger`,lessonId:`triggers`,title:`Trigger`,syntax:`CREATE OR REPLACE TRIGGER trg_bloquercomment
BEFORE INSERT ON comments
FOR EACH ROW
BEGIN
  IF :NEW.note NOT BETWEEN 0 AND 5 THEN
    RAISE_APPLICATION_ERROR(-20010, 'Note hors barème.');
  END IF;
END;
/

-- remplir une colonne de la ligne en cours : BEFORE
:NEW.date_validation := SYSDATE;

-- écrire dans une autre table : souvent AFTER
INSERT INTO obtenir (etudiant_id, matiere_id, note)
SELECT :NEW.id, m.id, 0 FROM matieres m;`,remember:[`:NEW et :OLD exigent FOR EACH ROW.`,`Modifier :NEW se fait en BEFORE.`,`WHEN (NEW.col = …) s'écrit sans deux-points.`],traps:[`SELECT sur la table du trigger → ORA-04091.`,`AFTER trop tard pour changer :NEW.`]},{id:`user`,lessonId:`utilisateurs`,title:`Utilisateur et lien`,syntax:`CREATE USER ecole IDENTIFIED BY ecole123
  DEFAULT TABLESPACE users
  QUOTA UNLIMITED ON users;

GRANT DBA TO ecole;

CREATE DATABASE LINK con_ecole
  CONNECT TO ecole IDENTIFIED BY ecole123
  USING 'ORCL';`,remember:[`CREATE USER ne donne aucun droit.`,`DBA seulement si le sujet le demande.`,`Une « connexion » nommée, sur la copie, est un database link.`],traps:[`GRANT avant CREATE USER échoue.`]},{id:`methode`,lessonId:`methode`,title:`Checklist de fin de copie`,syntax:`1. Nom exact du sujet
2. FUNCTION + RETURN NUMBER, ou PROCEDURE sans RETURN
3. FOR EACH ROW dès qu'il y a :NEW
4. BEFORE si on modifie :NEW ou si on refuse l'ordre
5. Statut entre quotes simples, casse du sujet
6. RAISE avant l'écriture interdite
7. Parenthèses et END; équilibrés`,remember:[`Rends les objets que tu sais faire même si le trigger bloque.`,`Le squelette nommé prend déjà des points.`,`Relis les seuils : 0 et 5, 33500, 0 et 20.`],traps:[`Réécrire le sujet « mieux » que l'énoncé (autre statut, autre nom).`]}],l=t();function u(){let[e,t]=(0,s.useState)(``),[r,u]=(0,s.useState)(c[0]?.id??null),d=(0,s.useMemo)(()=>{let t=e.trim().toLowerCase();return t?c.filter(e=>`${e.title} ${e.syntax} ${e.remember.join(` `)} ${e.traps.join(` `)}`.toLowerCase().includes(t)):c},[e]);return(0,l.jsxs)(i,{children:[(0,l.jsx)(`p`,{className:`text-sm font-semibold tracking-[0.16em] text-copper uppercase`,children:`Mémo`}),(0,l.jsx)(`h1`,{className:`mt-2 font-display text-4xl text-ink sm:text-5xl`,children:`Fiches à relire la veille`}),(0,l.jsx)(`p`,{className:`mt-3 max-w-2xl text-lg text-muted`,children:`Une syntaxe par notion, les rappels, les pièges. Cache le code, essaie de le réécrire, puis ouvre.`}),(0,l.jsxs)(`label`,{className:`mt-6 block max-w-md text-sm font-semibold text-ink`,children:[`Filtrer`,(0,l.jsx)(`input`,{value:e,onChange:e=>t(e.target.value),placeholder:`trigger, TRUNC, séquence…`,className:`mt-1 min-h-11 w-full rounded-2xl border border-line bg-sheet px-4 text-base font-normal outline-none focus:border-teal`})]}),(0,l.jsxs)(`div`,{className:`mt-6 flex flex-col gap-3`,children:[d.map(e=>{let t=o(e.lessonId),i=r===e.id;return(0,l.jsxs)(`article`,{className:`rounded-2xl border border-line bg-sheet p-4 sm:p-5`,children:[(0,l.jsxs)(`div`,{className:`flex flex-wrap items-start justify-between gap-3`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`h2`,{className:`font-display text-2xl text-ink`,children:e.title}),t?(0,l.jsxs)(n,{to:`/parcours/$lessonId`,params:{lessonId:t.id},className:`text-sm font-semibold text-teal-deep`,children:[`Leçon `,t.index,` · `,t.title]}):null]}),(0,l.jsx)(`button`,{type:`button`,onClick:()=>u(i?null:e.id),className:`min-h-11 rounded-full border border-line px-4 text-sm font-semibold`,children:i?`Cacher le code`:`Montrer le code`})]}),i?(0,l.jsx)(`div`,{className:`mt-4`,children:(0,l.jsx)(a,{code:e.syntax})}):(0,l.jsx)(`p`,{className:`mt-3 text-sm text-muted`,children:`Code masqué. Réécris-le sur papier, puis ouvre.`}),(0,l.jsxs)(`div`,{className:`mt-4 grid gap-4 sm:grid-cols-2`,children:[(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-xs font-semibold tracking-wide text-teal-deep uppercase`,children:`À retenir`}),(0,l.jsx)(`ul`,{className:`mt-2 flex flex-col gap-2 text-sm`,children:e.remember.map(e=>(0,l.jsx)(`li`,{children:e},e))})]}),(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`p`,{className:`text-xs font-semibold tracking-wide text-copper uppercase`,children:`Pièges`}),(0,l.jsx)(`ul`,{className:`mt-2 flex flex-col gap-2 text-sm`,children:e.traps.map(e=>(0,l.jsx)(`li`,{children:e},e))})]})]})]},e.id)}),d.length===0?(0,l.jsx)(`p`,{className:`text-muted`,children:`Aucune fiche ne contient ce mot.`}):null]})]})}var d=u;export{d as component};