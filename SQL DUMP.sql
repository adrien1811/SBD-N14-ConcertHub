--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: jenis_accomodation; Type: TYPE; Schema: public; Owner: adrien.ardra1811
--

CREATE TYPE public.jenis_accomodation AS ENUM (
    'hotel',
    'vila'
);


ALTER TYPE public.jenis_accomodation OWNER TO "adrien.ardra1811";

--
-- Name: kota_perform; Type: TYPE; Schema: public; Owner: adrien.ardra1811
--

CREATE TYPE public.kota_perform AS ENUM (
    'Jakarta',
    'Bandung',
    'Malang',
    'Surabaya'
);


ALTER TYPE public.kota_perform OWNER TO "adrien.ardra1811";

--
-- Name: metode_pembayaran; Type: TYPE; Schema: public; Owner: adrien.ardra1811
--

CREATE TYPE public.metode_pembayaran AS ENUM (
    'BCA',
    'GOPAY'
);


ALTER TYPE public.metode_pembayaran OWNER TO "adrien.ardra1811";

--
-- Name: status_order; Type: TYPE; Schema: public; Owner: adrien.ardra1811
--

CREATE TYPE public.status_order AS ENUM (
    'paid',
    'unpaid'
);


ALTER TYPE public.status_order OWNER TO "adrien.ardra1811";

--
-- Name: user_status; Type: TYPE; Schema: public; Owner: adrien.ardra1811
--

CREATE TYPE public.user_status AS ENUM (
    'normal',
    'privillege'
);


ALTER TYPE public.user_status OWNER TO "adrien.ardra1811";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: konser; Type: TABLE; Schema: public; Owner: adrien.ardra1811
--

CREATE TABLE public.konser (
    konser_id integer NOT NULL,
    harga_tiket integer NOT NULL,
    nama_konser character varying(50) NOT NULL,
    performer_id integer NOT NULL,
    tanggal_perform date NOT NULL,
    kota_perform character varying(50) NOT NULL,
    venue character varying(50) NOT NULL,
    kapasitas integer NOT NULL,
    kapasitas_privillege integer NOT NULL,
    rating numeric(2,1),
    deskripsi character varying(5000)
);


ALTER TABLE public.konser OWNER TO "adrien.ardra1811";

--
-- Name: konser_konser_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.konser_konser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.konser_konser_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: konser_konser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.konser_konser_id_seq OWNED BY public.konser.konser_id;


--
-- Name: konser_performer_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.konser_performer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.konser_performer_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: konser_performer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.konser_performer_id_seq OWNED BY public.konser.performer_id;


--
-- Name: order_ticket; Type: TABLE; Schema: public; Owner: adrien.ardra1811
--

CREATE TABLE public.order_ticket (
    user_id integer NOT NULL,
    order_id integer NOT NULL,
    konser_id integer NOT NULL,
    nama_pemesan character varying(50) NOT NULL,
    no_telpon bigint NOT NULL,
    email character varying(50) NOT NULL,
    status_order public.status_order NOT NULL,
    jenis_accomodation public.jenis_accomodation,
    harga_akomodasi integer,
    jumlah_payment integer NOT NULL,
    metode_pembayaran public.metode_pembayaran NOT NULL
);


ALTER TABLE public.order_ticket OWNER TO "adrien.ardra1811";

--
-- Name: order_ticket_order_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.order_ticket_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_ticket_order_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: order_ticket_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.order_ticket_order_id_seq OWNED BY public.order_ticket.order_id;


--
-- Name: performer; Type: TABLE; Schema: public; Owner: adrien.ardra1811
--

CREATE TABLE public.performer (
    performer_id integer NOT NULL,
    nama_performer character varying(500) NOT NULL,
    album character varying NOT NULL,
    deskripsi character varying(5000) NOT NULL
);


ALTER TABLE public.performer OWNER TO "adrien.ardra1811";

--
-- Name: performer_performer_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.performer_performer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.performer_performer_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: performer_performer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.performer_performer_id_seq OWNED BY public.performer.performer_id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: adrien.ardra1811
--

CREATE TABLE public.review (
    review_id integer NOT NULL,
    konser_id integer NOT NULL,
    rating integer NOT NULL,
    komen text,
    review_date date NOT NULL
);


ALTER TABLE public.review OWNER TO "adrien.ardra1811";

--
-- Name: review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.review_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_review_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.review_review_id_seq OWNED BY public.review.review_id;


--
-- Name: userr; Type: TABLE; Schema: public; Owner: adrien.ardra1811
--

CREATE TABLE public.userr (
    user_id integer NOT NULL,
    status_user public.user_status NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    no_telpon bigint NOT NULL,
    balance_bca integer,
    balance_gopay integer
);


ALTER TABLE public.userr OWNER TO "adrien.ardra1811";

--
-- Name: userr_user_id_seq; Type: SEQUENCE; Schema: public; Owner: adrien.ardra1811
--

CREATE SEQUENCE public.userr_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userr_user_id_seq OWNER TO "adrien.ardra1811";

--
-- Name: userr_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: adrien.ardra1811
--

ALTER SEQUENCE public.userr_user_id_seq OWNED BY public.userr.user_id;


--
-- Name: konser konser_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.konser ALTER COLUMN konser_id SET DEFAULT nextval('public.konser_konser_id_seq'::regclass);


--
-- Name: konser performer_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.konser ALTER COLUMN performer_id SET DEFAULT nextval('public.konser_performer_id_seq'::regclass);


--
-- Name: order_ticket order_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.order_ticket ALTER COLUMN order_id SET DEFAULT nextval('public.order_ticket_order_id_seq'::regclass);


--
-- Name: performer performer_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.performer ALTER COLUMN performer_id SET DEFAULT nextval('public.performer_performer_id_seq'::regclass);


--
-- Name: review review_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.review ALTER COLUMN review_id SET DEFAULT nextval('public.review_review_id_seq'::regclass);


--
-- Name: userr user_id; Type: DEFAULT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.userr ALTER COLUMN user_id SET DEFAULT nextval('public.userr_user_id_seq'::regclass);


--
-- Data for Name: konser; Type: TABLE DATA; Schema: public; Owner: adrien.ardra1811
--

COPY public.konser (konser_id, harga_tiket, nama_konser, performer_id, tanggal_perform, kota_perform, venue, kapasitas, kapasitas_privillege, rating, deskripsi) FROM stdin;
3	370000	Rex Orange Country	3	2024-03-21	Malang	UMM DOME	20000	1498	\N	Rex Orange County-real name Alex OConnor-is an indie singer-songwriter from Hampshire.\n\nHe released his debut album, Bcos U Will Never B Free in 2015, but started to gain global attention in 2017 after appearing on Tyler, The Creators Flower Boy album. Since then, he has released a further three albums to date, with the most recent being Who Cares? in 2022.\n\nRex Orange County will play a one-off headline show at Londons O2 Shepherds Bush Empire on March 10, 2023, to mark one year since the release of Who Cares. Catch him live by checking tour dates and ticket information here on Stereoboard.
2	250000	Bruno Major Tour of Planet Earth	2	2023-08-26	Bandung	Gedung Mandalawangi	35000	2996	\N	Bruno Major splices classic singer/songwriter confessionals with sleek modern electronic production, girding the entire enterprise with hints of soul. Based in Camden, London, Major was trained as a classical guitarist and released a live EP -- appropriately called Live EP -- in 2014 but he first received attention in 2016, when he set out to release a new song every month for a full year, a project that would extend into 2017. He accompanied this steady stream of digital singles with regular live appearances in London, sometimes opening for Lianne La Havas.
1	500000	Coldplay Music of The Spheres	1	2023-11-15	Jakarta	Gelora Bung Karno	64995	4981	3.4	Jakarta, 9 May 2023 - Coldplay have announced their hugely-anticipated return to Asia and Australia with a special run of stadium shows in November 2023, as part of their record-breaking Music Of The Spheres World Tour. The announcement marks the bands first ever show in Jakarta, taking place on 15 November at Gelora Bung Karno Stadium.\n\n \n\nSince the tour first date in March 2022, the band have sold more tickets than any other artist in the world, receiving rave reviews from fans and critics alike and picking up accolades including Favorite Touring Artist at the 2022 AMAs and Tour of The Year at the 2023 iHeartRadio Awards.\n\n\nThe dates feature Coldplay first Tokyo shows since 2017, their first ever dates in Kaohsiung, Jakarta and Kuala Lumpur and a special one-off performance in Perth, their first in Western Australia since 2009.
4	250000	Westlife	4	2024-05-05	Surabaya	Balai Budaya	40000	4192	\N	Westlife will once again be hitting the road this year, following their record-breaking 2019 reunion tour which saw Shane, Nicky, Mark and Kian play to over 600,000 fans across 27 countries. The Irish pop kings kick off their tour this summer performing across the U.K. including an already sold-out headline show at Londons iconic Wembley Stadium. \n\n \n\nThe Wild Dreams Tour will see Westlife get closer to their fans than ever before, as they belt out all of their greatest hits Swear It Again, Flying Without Wings and World of our Own as well as fresh pop anthems from their new album Wild Dreams. \n\n \n\nThe band says, We are incredibly excited to announce news of The Wild Dreams Tour and to finally get back performing to all of our fans in Jakarta, Indonesia. After these past months with all thats happening in the world, this tour means more to us than any that we ve ever done before. It will be a massive celebration and will bring us closer to our fans than ever before. We are planning some spectacular shows which will include all of our greatest hits and some special surprises.\n\n \n\nNews of the 2022 tour marks the beginning of a packed schedule for Westlife following the huge success of their latest album Wild Dreams released November 2021. The foursome - Shane, Nicky, Mark and Kian have established themselves as the worlds biggest band of the 21st century, having sold over 55 million records worldwide and are the only band to have their first seven singles enter the UK chart at No.1. They also have the most singles of any artist to debut at No.1 in the UK. Overall, Westlife has had an incredible 14 No.1 singles, behind only Elvis Presley and The Beatles. They have had 33 No.1 albums worldwide and as a live act they have sold five million concert tickets worldwide and counting.
\.


--
-- Data for Name: order_ticket; Type: TABLE DATA; Schema: public; Owner: adrien.ardra1811
--

COPY public.order_ticket (user_id, order_id, konser_id, nama_pemesan, no_telpon, email, status_order, jenis_accomodation, harga_akomodasi, jumlah_payment, metode_pembayaran) FROM stdin;
1	1	1	John Doe	1234567890	johndoe@example.com	paid	\N	0	500000	GOPAY
1	2	1	John Doe	1234567890	johndoe@example.com	paid	\N	0	500000	GOPAY
1	3	1	John Doe	1234567890	johndoe@example.com	paid	vila	600000	1100000	GOPAY
1	4	1	John Doe	1234567890	johndoe@example.com	paid	vila	600000	1100000	GOPAY
2	5	2	naufal	1234567890	johndoe@example.com	paid	\N	0	250000	GOPAY
5	8	2	naufal	1234567890	johndoe@example.com	paid	\N	0	225000	GOPAY
5	9	2	naufal	1234567890	johndoe@example.com	paid	\N	0	250000	BCA
5	10	2	naufal	1234567890	johndoe@example.com	paid	\N	0	250000	BCA
5	11	2	naufal	1234567890	johndoe@example.com	paid	\N	0	225000	GOPAY
6	12	2	naufal	1234567890	johndoe@example.com	paid	\N	0	250000	BCA
6	13	2	naufal	1234567890	johndoe@example.com	paid	\N	0	225000	GOPAY
6	14	2	naufal	1234567890	johndoe@example.com	paid	vila	600000	765000	GOPAY
9	15	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	\N	0	450000	GOPAY
9	16	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	810000	GOPAY
9	17	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	900000	BCA
9	18	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	810000	GOPAY
9	19	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	810000	GOPAY
3	20	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	\N	0	450000	GOPAY
3	21	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	\N	0	500000	BCA
9	22	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	\N	0	450000	GOPAY
10	23	1	Adrien	81310310242	adrien_aube@yahoo.com	paid	\N	0	500000	BCA
68	24	1	Nopal	1010	Nopal@EX	paid	hotel	400000	900000	BCA
68	25	1	Nopal	1010	Nopal@EX	paid	hotel	400000	900000	BCA
68	26	1	Nopal	313123	nopal@EX	paid	hotel	400000	900000	BCA
68	27	1	Nopal	313123	nopal@EX	paid	vila	600000	1100000	BCA
68	28	2	Test	21134	nopal@EX	paid	vila	600000	850000	BCA
68	29	2	Test	21134	nopal@EX	paid	vila	600000	850000	BCA
70	30	4	adrien.ardrar@gmail.com	81310310242	aube_adrien@yahoo.com	paid	hotel	400000	585000	GOPAY
70	31	4	adrien.ardrar@gmail.com	81310310242	aube_adrien@yahoo.com	paid	hotel	400000	585000	GOPAY
70	32	4	adrien.ardrar@gmail.com	81310310242	aube_adrien@yahoo.com	paid	hotel	400000	585000	GOPAY
70	33	4	adrien.ardra	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	585000	GOPAY
70	34	4	adrien.ardra	81310310242	adrien_aube@yahoo.com	paid	hotel	400000	585000	GOPAY
72	35	1	adrien.ardra	81310310242	aubeaiden@gmail.com	paid	hotel	400000	810000	GOPAY
72	36	1	adrien.ardra	81310310242	@ui.ac.id	paid	hotel	400000	810000	GOPAY
68	37	1	Nopal	1010	Nopal@EX	paid	hotel	400000	500000	BCA
72	38	1	adrien18111	81310310242	@ui.ac.id	paid	hotel	400000	810000	GOPAY
68	39	1	Nopal	1010	Nopal@EX	paid	hotel	400000	900000	BCA
57	40	1	Nopal	1010	Nopal@EX	paid	hotel	0	500000	BCA
57	41	1	Nopal	1010	Nopal@EX	paid	hotel	0	500000	BCA
57	42	1	Nopal	1010	Nopal@EX	paid	\N	0	500000	BCA
57	43	1	Nopal	1010	Nopal@EX	paid	\N	0	500000	BCA
57	44	1	Nopal	1010	Nopal@EX	paid	\N	0	500000	BCA
68	45	1	Nopal	1010	Nopal@EX	paid	hotel	400000	900000	BCA
44	46	4	adrien.ardra	81310310242	@ui.ac.id	paid	\N	0	250000	BCA
44	47	4	adrien.ardra	81310310242	@ui.ac.id	paid	\N	0	250000	BCA
44	48	4	adrien.ardra	81310310242	azzahangely@gmail.com	paid	\N	0	250000	BCA
44	49	2	AMTB	81310310242	azzahangely@gmail.com	paid	\N	0	250000	BCA
73	50	1	adrien.ardra	81310310242	aubeaiden@gmail.com	paid	\N	0	450000	GOPAY
66	51	2	jereme	1234	jeregan	paid	\N	0	225000	GOPAY
66	52	2	oi	12	bang	paid	\N	0	225000	GOPAY
66	53	2	oi	12	bang	paid	\N	0	225000	GOPAY
66	54	4	jereme	1234	jeregan	paid	\N	0	250000	BCA
75	55	3	jeremy	1234	asdq	paid	vila	600000	970000	BCA
76	56	3	Benito	12345	kontol	paid	vila	600000	970000	BCA
76	57	4	Benito	1234	kontol	paid	vila	600000	765000	GOPAY
77	58	4	adrien.ardra	81310310242	aubeaiden@gmail.com	paid	hotel	400000	650000	BCA
44	59	1	adrien18111	81310310242	miramoerty@gmail.com	paid	\N	0	450000	GOPAY
44	60	2	adrien18111	81310310242	miramoerty@gmail.com	paid	\N	0	225000	GOPAY
44	61	4	adrien18111	81310310242	@ui.ac.id	paid	\N	0	225000	GOPAY
\.


--
-- Data for Name: performer; Type: TABLE DATA; Schema: public; Owner: adrien.ardra1811
--

COPY public.performer (performer_id, nama_performer, album, deskripsi) FROM stdin;
2	Bruno Major	To Let A Good Thing Die	Bruno Major is a British singer, songwriter, and musician. He gained recognition for his soulful and introspective music, characterized by his smooth vocals and melodic guitar playing. Bruno Majors music blends elements of folk, pop, and R&B, creating a unique and captivating sound.\n\nMajor first gained attention with his debut EP titled "Live EP" in 2014. He continued to release music independently, including singles like Wouldnt Mean a Thing,Easily, and "Home." In 2017, he released his debut album, A Song for Every Moon, which garnered critical acclaim and further established his reputation as a talented singer-songwriter.\n\nKnown for his heartfelt lyrics and emotive performances, Bruno Major has attracted a dedicated fan base and has toured internationally. His music often explores themes of love, relationships, and personal growth, resonating with listeners on an emotional level.\n\nOverall, Bruno Major is recognized for his soulful voice, skilled guitar playing, and poetic songwriting, making him a notable artist in the contemporary music scene.
1	Coldplay	Music of the Spheres	Coldplay is a British rock band formed in London in 1996. The band members are Chris Martin (lead vocals, keyboards, guitar), Jonny Buckland (lead guitar), Guy Berryman (bass guitar), and Will Champion (drums, backing vocals, percussion). Coldplay music is often characterized as alternative rock, pop rock, and indie rock with influences from various genres.\n\nThey gained international fame with their debut album, Parachutes, released in 2000, which included hit singles like Yellow and Trouble. Since then, Coldplay has released several successful albums, including A Rush of Blood to the Head, X&Y, Viva la Vida or Death and All His Friends, Mylo Xyloto,Ghost Stories,A Head Full of Dreams, and Everyday Life.\n\nColdplay is known for their melodic sound, introspective lyrics, and emotionally-driven songs. They have achieved great commercial success and critical acclaim, winning numerous awards and selling millions of records worldwide. Some of their popular songs include Clocks,The Scientist,Fix You,Viva la Vida,Paradise,Adventure of a Lifetime, and Something Just Like This (a collaboration with The Chainsmokers).\n\nIn addition to their musical achievements, Coldplay is also known for their philanthropic efforts and involvement in social and environmental causes. They have supported various charities and initiatives, including Oxfam, Amnesty International, and Global Citizen.\n\nOverall, Coldplay is one of the most successful and influential bands of the 21st century, with a vast fan base and a significant impact on the music industry.
3	Rex Orange Country	Who Cares?	Rex Orange County, whose real name is Alexander OConnor, is an English singer-songwriter and musician. He gained popularity for his unique blend of indie pop, alternative R&B, and bedroom pop music styles. Rex Orange County was born on May 4, 1998, in Grayshott, Hampshire, England.\n\nRex began his musical journey at a young age, learning to play the drums and guitar. He started writing and recording his own music while attending school. In 2015, he self-released his debut album, bcos u will never b free, which gained attention and positive reviews.\n\nHis breakthrough came in 2017 with the release of his second album, Apricot Princess. The album showcased Rexs introspective songwriting, soulful vocals, and musical versatility. It received critical acclaim and helped him garner a wider fan base.\n\nRex Orange Countys music often explores themes of love, relationships, and personal experiences, with a mix of heartfelt lyrics and catchy melodies. Some of his most popular songs include Loving Is Easy, Best Friend, Sunflower, and 10/10.\n\nRex Orange Countys talent and unique musical style have earned him collaborations with other artists, including Tyler, The Creator, and Randy Newman. He has also performed on notable stages, such as The Tonight Show Starring Jimmy Fallon and Coachella.\n\nOverall, Rex Orange County has made a significant impact in the music industry with his distinctive sound and heartfelt songwriting. He continues to evolve as an artist and gain recognition for his contributions to the indie pop and alternative music scenes.
4	Westlife	Coast to coas	Westlife is an Irish pop vocal group that was formed in 1998. The group originally consisted of Shane Filan, Kian Egan, Mark Feehily, Nicky Byrne, and Brian McFadden (who left the group in 2004). They gained massive popularity in the late 1990s and early 2000s with their harmonious vocals, ballad-style songs, and polished image.\n\nWestlifes music is primarily pop with elements of balladry and adult contemporary styles. They are known for their smooth vocal harmonies, emotional lyrics, and romantic ballads. The group has released numerous successful albums and singles, achieving chart-topping success in many countries.\n\nSome of Westlifes biggest hits include Swear It Again, Flying Without Wings, My Love, Fool Again, You Raise Me Up, and Unbreakable. They have sold millions of records worldwide and have had multiple chart-topping albums and singles.\n\nThroughout their career, Westlife has toured extensively and performed in various countries, including sold-out arena shows and stadium concerts. They have also collaborated with other artists, such as Diana Ross, Mariah Carey, and Delta Goodrem.\n\nIn 2012, Westlife announced their decision to disband after a farewell tour, marking the end of their successful run as a group. However, in 2018, they made a comeback and released new music, continuing to delight their fans with their signature sound.\n\nWestlifes music has left a lasting impact on the pop music scene, and they are recognized as one of the most successful Irish boy bands of all time. Their heartfelt ballads and memorable performances have made them beloved by fans around the world.
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: adrien.ardra1811
--

COPY public.review (review_id, konser_id, rating, komen, review_date) FROM stdin;
1	1	4	Ini adalah sebuah komen yang digunakan sebagai sebuah test apakah dapat melakukan input	2020-12-04
2	1	5	Ini adalah sebuah komen yang digunakan sebagai sebuah test apakah dapat mengubah rating	2020-12-04
3	1	3	Ini adalah sebuah komen yang digunakan sebagai sebuah test apakah dapat mengubah rating	2020-12-04
4	3	5	Ini adalah sebuah komen yang digunakan sebagai sebuah test apakah dapat mengubah rating	2020-12-04
5	1	4	Great concert!	2023-05-31
6	1	1	halah sampah nih konsernya	2023-05-31
7	10	5	bagus	2023-05-31
\.


--
-- Data for Name: userr; Type: TABLE DATA; Schema: public; Owner: adrien.ardra1811
--

COPY public.userr (user_id, status_user, username, password, email, no_telpon, balance_bca, balance_gopay) FROM stdin;
49	normal	nyoba	password123	nyoba@gmail.com	1234567	0	0
50	privillege	azzah	inipassword	azzah@gmail.com	12345	0	0
51	normal	awikwok	12345	awikwok@gmail.com	12345	0	0
53	normal	ardra	12345	ramadhan@gmail.com	12345	0	0
54	normal	Arka	arka123	arka@gmail.com	123456	0	0
55	normal	Arka	arka123	arka@gmail.com	123456	0	0
56	normal	Arka	arka123	arka@gmail.com	123456	0	0
58	normal	Jeremy	1234	jeremy.ganda	1234	0	0
4	privillege	jeremy	password124	jeremy@example.com	1234567892	2000000	2000000
59	normal	Messi	messi123	messi@gmail.com	12345	0	0
2	normal	naufal	password123	naufal@example.com	1234567898	\N	1000
60	privillege	adrin	12345	adrin@gmail.com	12345	0	0
7	privillege	jeremy	password124	jeremy@example.com	1234567892	2000000	2000000
61	privillege	nyobaaja	12345	nyobaaja@example.com	12345	0	0
62	normal	Jeremy	123345	jeremy@gmail.com	12345	0	0
8	privillege	jeremy	password124	jeremy@example.com	1234567892	2000000	2000000
57	normal	Nopal	12345	nopal@example.com	12345	4020500	10000
68	privillege	Kansas	12345	Kansas@EX	1010101	700000	550000
69	privillege	Adrien123	12345	adrien@gmail.com	12345	0	1000000
63	normal	Romeo	12345	NNNN	0	0	0
64	normal	Romeo	12345	NNNN	0	0	0
5	privillege	jeremy	password124	jeremy@example.com	1234567892	1600000	1100000
65	normal	jeremo	1234	jeremo.com	1234	0	0
6	privillege	jeremy	password124	jeremy@example.com	1234567892	1750000	1010000
67	privillege	ashta	kontol	anjing	1234	0	0
76	privillege	Benito	Kontol	Kontol	12345	30000	4235000
70	privillege	Umtiti123	1234	adrien@example.com	1234	0	16075000
71	privillege	hahaha	hahaha	hahaha@gmail.com	123455	0	10000000
3	normal	naufal	password123	naufal@example.com	1234567898	1500000	11550000
9	privillege	Adrnard	AUBE1010	Adrien_Aube@yahoo.com	81310310242	100000	9670000
10	normal	nopal	AUBE1010	Adrien_Aube@yahoo.com	81310310242	1500000	\N
11	normal	adrien1811	adrien	adrien123@gmail.com	8131031027	0	0
13	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
12	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
14	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
15	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
16	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
17	normal	hazard	hazard1010	hazard@gmail.com	12345678	0	0
18	privillege	messi	messi123	messi@gmail.com	123456789	0	0
19	privillege	messi	messi123	messi@gmail.com	123456789	0	0
20	privillege	messi	messi123	messi@gmail.com	123456789	0	0
21	privillege	messi	messi123	messi@gmail.com	123456789	0	0
22	privillege	messi	messi123	messi@gmail.com	123456789	0	0
23	privillege	messi	messi123	messi@gmail.com	123456789	0	0
24	privillege	messi	messi123	messi@gmail.com	123456789	0	0
25	privillege	messi	messi123	messi@gmail.com	123456789	0	0
26	normal	neymar	neymar123	neymar@gmail.com	813101323	0	0
27	normal	jeremy1	jeremy1	jeremy1@gmail.com	12345	0	0
1	privillege	Adrien	password123	johndoe@example.com	1234567890	1110000	12545
36	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
38	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
37	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
39	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
40	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
41	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
42	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
43	normal	adrienardra	aube1010	adrien1234@yahoo.com	12345	0	0
73	normal	hazard	1234	hazard1234@gmail.com	1234	0	9550000
74	privillege	Adrinn	12334	sadasd	12345	0	0
77	privillege	Hazard	12345	adasda	12345	100000	0
72	privillege	hihihi	12345	hihihi@gmail.com	12335	0	9570000
66	normal	jereme	1234	jeregan	1234	753600	345000
75	privillege	jeregan	1234	asdasd	1234	1030000	0
44	normal	Umtiti	barcelona	umtiti@gmail.com	123456	101000	499320000
\.


--
-- Name: konser_konser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.konser_konser_id_seq', 1, false);


--
-- Name: konser_performer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.konser_performer_id_seq', 1, false);


--
-- Name: order_ticket_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.order_ticket_order_id_seq', 61, true);


--
-- Name: performer_performer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.performer_performer_id_seq', 1, false);


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.review_review_id_seq', 7, true);


--
-- Name: userr_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: adrien.ardra1811
--

SELECT pg_catalog.setval('public.userr_user_id_seq', 77, true);


--
-- Name: konser konser_performer_id_key; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.konser
    ADD CONSTRAINT konser_performer_id_key UNIQUE (performer_id);


--
-- Name: konser konser_pkey; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.konser
    ADD CONSTRAINT konser_pkey PRIMARY KEY (konser_id);


--
-- Name: order_ticket order_ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.order_ticket
    ADD CONSTRAINT order_ticket_pkey PRIMARY KEY (order_id);


--
-- Name: performer performer_pkey; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.performer
    ADD CONSTRAINT performer_pkey PRIMARY KEY (performer_id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- Name: userr userr_pkey; Type: CONSTRAINT; Schema: public; Owner: adrien.ardra1811
--

ALTER TABLE ONLY public.userr
    ADD CONSTRAINT userr_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

