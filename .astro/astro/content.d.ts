declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"books": {
"apologetics/craig-reasonable-faith-3rd-edition": {
	id: "apologetics/craig-reasonable-faith-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"biblical-theology/goldsworthy-according-to-plan": {
	id: "biblical-theology/goldsworthy-according-to-plan";
  collection: "books";
  data: InferEntrySchema<"books">
};
"biblical-theology/ladd-hagner-a-theology-of-the-new-testament-revised": {
	id: "biblical-theology/ladd-hagner-a-theology-of-the-new-testament-revised";
  collection: "books";
  data: InferEntrySchema<"books">
};
"biblical-theology/schreiner-new-testament-theology": {
	id: "biblical-theology/schreiner-new-testament-theology";
  collection: "books";
  data: InferEntrySchema<"books">
};
"christian-living/packer-knowing-god": {
	id: "christian-living/packer-knowing-god";
  collection: "books";
  data: InferEntrySchema<"books">
};
"christian-living/whitney-spiritual-disciplines-for-the-christian-life-revis": {
	id: "christian-living/whitney-spiritual-disciplines-for-the-christian-life-revis";
  collection: "books";
  data: InferEntrySchema<"books">
};
"church-history/gonzales-the-story-of-christianity-vol-1": {
	id: "church-history/gonzales-the-story-of-christianity-vol-1";
  collection: "books";
  data: InferEntrySchema<"books">
};
"church-history/gonzales-the-story-of-christianity-vol-2": {
	id: "church-history/gonzales-the-story-of-christianity-vol-2";
  collection: "books";
  data: InferEntrySchema<"books">
};
"church-history/shelley-church-history-in-plain-language-5th-edition": {
	id: "church-history/shelley-church-history-in-plain-language-5th-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/beale-commentary-on-the-new-testament-use-of-the-old-tes": {
	id: "hermeneutics/beale-commentary-on-the-new-testament-use-of-the-old-tes";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/beale-handbook-on-the-new-testament-use-of-the-old-testa": {
	id: "hermeneutics/beale-handbook-on-the-new-testament-use-of-the-old-testa";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/doriani-getting-the-message": {
	id: "hermeneutics/doriani-getting-the-message";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/fee-douglas-how-to-read-the-bible-for-all-its-worth-4th-editio": {
	id: "hermeneutics/fee-douglas-how-to-read-the-bible-for-all-its-worth-4th-editio";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/fee-new-testament-exegesis-3rd-edition": {
	id: "hermeneutics/fee-new-testament-exegesis-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/kaiser-toward-an-exegetical-theology": {
	id: "hermeneutics/kaiser-toward-an-exegetical-theology";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/klein-bloomberg-hubbard-introduction-to-biblical-interpretation-3rd-editio": {
	id: "hermeneutics/klein-bloomberg-hubbard-introduction-to-biblical-interpretation-3rd-editio";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/osborne-the-hermeneutical-spiral": {
	id: "hermeneutics/osborne-the-hermeneutical-spiral";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/poythress-reading-the-word-of-god-in-the-presence-of-god": {
	id: "hermeneutics/poythress-reading-the-word-of-god-in-the-presence-of-god";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/stewart-old-testament-exegesis-4th-edition": {
	id: "hermeneutics/stewart-old-testament-exegesis-4th-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/thiselton-hermeneutics": {
	id: "hermeneutics/thiselton-hermeneutics";
  collection: "books";
  data: InferEntrySchema<"books">
};
"hermeneutics/vanhoozer-mere-christian-hermeneutics": {
	id: "hermeneutics/vanhoozer-mere-christian-hermeneutics";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/adeney-graceful-evangelism": {
	id: "missiology/adeney-graceful-evangelism";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/adeney-kingdom-without-borders": {
	id: "missiology/adeney-kingdom-without-borders";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/allen-missionary-methods-st-paul-s-or-ours": {
	id: "missiology/allen-missionary-methods-st-paul-s-or-ours";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/conn-ortiz-urban-ministry": {
	id: "missiology/conn-ortiz-urban-ministry";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/elmer-cross-cultural-connections": {
	id: "missiology/elmer-cross-cultural-connections";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/escobar-the-new-global-mission": {
	id: "missiology/escobar-the-new-global-mission";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/garrison-inside-church-planting-movements": {
	id: "missiology/garrison-inside-church-planting-movements";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/hesselgrave-communicating-christ-cross-culturally-2nd-edition": {
	id: "missiology/hesselgrave-communicating-christ-cross-culturally-2nd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/hiebert-anthropological-insights-for-missionaries": {
	id: "missiology/hiebert-anthropological-insights-for-missionaries";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/jenkins-the-next-christendom-3rd-edition": {
	id: "missiology/jenkins-the-next-christendom-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/lingenfelter-mayers-ministering-cross-culturally-3rd-edition": {
	id: "missiology/lingenfelter-mayers-ministering-cross-culturally-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/livermore-cultural-intelligence": {
	id: "missiology/livermore-cultural-intelligence";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/mandryk-operation-world": {
	id: "missiology/mandryk-operation-world";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/newbigin-the-gospel-in-a-pluralist-society": {
	id: "missiology/newbigin-the-gospel-in-a-pluralist-society";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/ott-strauss-tennent-encountering-theology-of-mission": {
	id: "missiology/ott-strauss-tennent-encountering-theology-of-mission";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/parshall-muslim-evangelism": {
	id: "missiology/parshall-muslim-evangelism";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/pierson-the-dynamics-of-christian-mission": {
	id: "missiology/pierson-the-dynamics-of-christian-mission";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/piper-let-the-nations-be-glad": {
	id: "missiology/piper-let-the-nations-be-glad";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/pocock-rheenen-mcconnell-moreaus-the-changing-face-of-world-missions": {
	id: "missiology/pocock-rheenen-mcconnell-moreaus-the-changing-face-of-world-missions";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/priest-howell-effective-engagement-in-short-term-missions": {
	id: "missiology/priest-howell-effective-engagement-in-short-term-missions";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/richardson-eternity-in-their-hearts": {
	id: "missiology/richardson-eternity-in-their-hearts";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/richardson-peace-child": {
	id: "missiology/richardson-peace-child";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/steffen-barnett-business-as-mission": {
	id: "missiology/steffen-barnett-business-as-mission";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/tennent-invitation-to-world-missions": {
	id: "missiology/tennent-invitation-to-world-missions";
  collection: "books";
  data: InferEntrySchema<"books">
};
"missiology/winter-hawthorne-perspectives-on-the-world-christian-movement-4th-e": {
	id: "missiology/winter-hawthorne-perspectives-on-the-world-christian-movement-4th-e";
  collection: "books";
  data: InferEntrySchema<"books">
};
"new-testament/carson-moo-an-introduction-to-the-new-testament": {
	id: "new-testament/carson-moo-an-introduction-to-the-new-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"new-testament/carson-the-gospel-according-to-john-pntc": {
	id: "new-testament/carson-the-gospel-according-to-john-pntc";
  collection: "books";
  data: InferEntrySchema<"books">
};
"new-testament/hays-the-mortal-vision-of-the-new-testament": {
	id: "new-testament/hays-the-mortal-vision-of-the-new-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"new-testament/moo-the-letter-to-the-romans-nicnt": {
	id: "new-testament/moo-the-letter-to-the-romans-nicnt";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/hess-the-old-testament": {
	id: "old-testament/hess-the-old-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/hill-walton-a-survey-of-the-old-testament-4th-edition": {
	id: "old-testament/hill-walton-a-survey-of-the-old-testament-4th-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/keil-delitzsch-commentary-on-the-old-testament-17-012-pages-23-3-": {
	id: "old-testament/keil-delitzsch-commentary-on-the-old-testament-17-012-pages-23-3-";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/kitchen-on-the-reliability-of-the-old-testament": {
	id: "old-testament/kitchen-on-the-reliability-of-the-old-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/longman-dillard-an-introduction-to-the-old-testament": {
	id: "old-testament/longman-dillard-an-introduction-to-the-old-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/richter-the-epic-of-eden": {
	id: "old-testament/richter-the-epic-of-eden";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/richter-the-epic-of-eden-study-guide": {
	id: "old-testament/richter-the-epic-of-eden-study-guide";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/schneider-an-introduction-to-ancient-mesopotamian-religion": {
	id: "old-testament/schneider-an-introduction-to-ancient-mesopotamian-religion";
  collection: "books";
  data: InferEntrySchema<"books">
};
"old-testament/wright-old-testament-ethics-for-the-people-of-god": {
	id: "old-testament/wright-old-testament-ethics-for-the-people-of-god";
  collection: "books";
  data: InferEntrySchema<"books">
};
"pastoral-ministry/chapell-christ-centered-preaching-3rd-edition": {
	id: "pastoral-ministry/chapell-christ-centered-preaching-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/beitzel-the-new-moody-atlas-of-the-bible": {
	id: "reference-resources/beitzel-the-new-moody-atlas-of-the-bible";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/bertman-handbook-to-life-in-ancient-mesopotamia": {
	id: "reference-resources/bertman-handbook-to-life-in-ancient-mesopotamia";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/black-green-gods-demons-and-symbols-of-ancient-mesopotamia": {
	id: "reference-resources/black-green-gods-demons-and-symbols-of-ancient-mesopotamia";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/blackwell-history-of-the-ancient-world-sold-individually-or-in-sets-of-6-and-11--blackwell-history-of-the-ancient-world-10-book-set": {
	id: "reference-resources/blackwell-history-of-the-ancient-world-sold-individually-or-in-sets-of-6-and-11--blackwell-history-of-the-ancient-world-10-book-set";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/blackwell-history-of-the-ancient-world-sold-individually-or-in-sets-of-6-and-11--blackwell-history-of-the-ancient-world-6-book-set": {
	id: "reference-resources/blackwell-history-of-the-ancient-world-sold-individually-or-in-sets-of-6-and-11--blackwell-history-of-the-ancient-world-6-book-set";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/bott-ro-religion-in-ancient-mesopotamia": {
	id: "reference-resources/bott-ro-religion-in-ancient-mesopotamia";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/de-vaux-ancient-israel": {
	id: "reference-resources/de-vaux-ancient-israel";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/dever-lives-of-ordinary-people-in-ancient-israel": {
	id: "reference-resources/dever-lives-of-ordinary-people-in-ancient-israel";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/duguid-hamilton-sklar-esv-expository-commentary-12-volume-set-2025": {
	id: "reference-resources/duguid-hamilton-sklar-esv-expository-commentary-12-volume-set-2025";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/ebeling-evangelical-dictionary-of-theology-3rd-edition": {
	id: "reference-resources/ebeling-evangelical-dictionary-of-theology-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/ebeling-women-s-lives-in-biblical-times": {
	id: "reference-resources/ebeling-women-s-lives-in-biblical-times";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/hess-israelite-religions": {
	id: "reference-resources/hess-israelite-religions";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/hoerth-peoples-of-the-old-testament-world": {
	id: "reference-resources/hoerth-peoples-of-the-old-testament-world";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/jacobsen-the-treasures-of-darkness": {
	id: "reference-resources/jacobsen-the-treasures-of-darkness";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/mettinger-in-search-of-god": {
	id: "reference-resources/mettinger-in-search-of-god";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/miller-the-religion-of-ancient-israel": {
	id: "reference-resources/miller-the-religion-of-ancient-israel";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/pinch-egyptian-myth": {
	id: "reference-resources/pinch-egyptian-myth";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/sasson-civilizations-of-the-ancient-near-east-2-volume-se": {
	id: "reference-resources/sasson-civilizations-of-the-ancient-near-east-2-volume-se";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/smith-miller-the-early-history-of-god": {
	id: "reference-resources/smith-miller-the-early-history-of-god";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/teeter-religion-and-ritual-in-ancient-egypt": {
	id: "reference-resources/teeter-religion-and-ritual-in-ancient-egypt";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/vandertoorn-becking-horst-dictionary-of-deities-and-demons-in-the-bible": {
	id: "reference-resources/vandertoorn-becking-horst-dictionary-of-deities-and-demons-in-the-bible";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/vangemeren-new-international-dictionary-of-old-testament-theo": {
	id: "reference-resources/vangemeren-new-international-dictionary-of-old-testament-theo";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/von-soden-the-ancient-orient": {
	id: "reference-resources/von-soden-the-ancient-orient";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/walton-ancient-near-eastern-thought-and-the-old-testament": {
	id: "reference-resources/walton-ancient-near-eastern-thought-and-the-old-testament";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/walton-the-lost-world-of-adam-and-eve": {
	id: "reference-resources/walton-the-lost-world-of-adam-and-eve";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/walton-the-lost-world-of-genesis-one-8-book-series": {
	id: "reference-resources/walton-the-lost-world-of-genesis-one-8-book-series";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/westbrook-wells-everyday-law-in-biblical-israel": {
	id: "reference-resources/westbrook-wells-everyday-law-in-biblical-israel";
  collection: "books";
  data: InferEntrySchema<"books">
};
"reference-resources/white-everyday-life-in-ancient-egypt": {
	id: "reference-resources/white-everyday-life-in-ancient-egypt";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/collins-evans-christian-beginnings-and-the-dead-sea-scrolls": {
	id: "second-temple/collins-evans-christian-beginnings-and-the-dead-sea-scrolls";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/collins-kugler-religion-in-the-dead-sea-scrolls": {
	id: "second-temple/collins-kugler-religion-in-the-dead-sea-scrolls";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/collins-the-scepter-and-the-star-2nd-edition": {
	id: "second-temple/collins-the-scepter-and-the-star-2nd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/evans-flint-eschatology-messianism-and-the-dead-sea-scrolls": {
	id: "second-temple/evans-flint-eschatology-messianism-and-the-dead-sea-scrolls";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/evans-the-world-of-jesus-and-the-early-church": {
	id: "second-temple/evans-the-world-of-jesus-and-the-early-church";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/fitzmyer-the-dead-sea-scrolls-and-christian-origins": {
	id: "second-temple/fitzmyer-the-dead-sea-scrolls-and-christian-origins";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/flint-vanderkam-the-meaning-of-the-dead-sea-scrolls": {
	id: "second-temple/flint-vanderkam-the-meaning-of-the-dead-sea-scrolls";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/flusser-judaism-of-the-second-temple-period-vol-1": {
	id: "second-temple/flusser-judaism-of-the-second-temple-period-vol-1";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/flusser-judaism-of-the-second-temple-period-vol-2": {
	id: "second-temple/flusser-judaism-of-the-second-temple-period-vol-2";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/grabbe-an-introduction-to-second-temple-judaism": {
	id: "second-temple/grabbe-an-introduction-to-second-temple-judaism";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/grabbe-the-history-of-the-second-temple-period": {
	id: "second-temple/grabbe-the-history-of-the-second-temple-period";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/schiffman-from-text-to-tradition": {
	id: "second-temple/schiffman-from-text-to-tradition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/skarsaune-hvalvik-believers-in-jesus": {
	id: "second-temple/skarsaune-hvalvik-believers-in-jesus";
  collection: "books";
  data: InferEntrySchema<"books">
};
"second-temple/skarsaune-in-the-shadow-of-the-temple": {
	id: "second-temple/skarsaune-in-the-shadow-of-the-temple";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/bavinck-reformed-dogmatics": {
	id: "systematic-theology/bavinck-reformed-dogmatics";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/berkhof-systematic-theolog": {
	id: "systematic-theology/berkhof-systematic-theolog";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/demarest-feinberg-the-cross-and-salvation": {
	id: "systematic-theology/demarest-feinberg-the-cross-and-salvation";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/erickson-christian-theology-3rd-edition": {
	id: "systematic-theology/erickson-christian-theology-3rd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/frame-systematic-theology": {
	id: "systematic-theology/frame-systematic-theology";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/grudem-systematic-theology-2nd-edition": {
	id: "systematic-theology/grudem-systematic-theology-2nd-edition";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/grudem-systematic-theology-doctrine": {
	id: "systematic-theology/grudem-systematic-theology-doctrine";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/grudem-systematic-theology-pack-bundle": {
	id: "systematic-theology/grudem-systematic-theology-pack-bundle";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/hoekema-created-in-god-s-image": {
	id: "systematic-theology/hoekema-created-in-god-s-image";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/letham-systematic-theology": {
	id: "systematic-theology/letham-systematic-theology";
  collection: "books";
  data: InferEntrySchema<"books">
};
"systematic-theology/reymond-a-new-systematic-theology-of-the-christian-faith-2": {
	id: "systematic-theology/reymond-a-new-systematic-theology-of-the-christian-faith-2";
  collection: "books";
  data: InferEntrySchema<"books">
};
};
"categories": Record<string, {
  id: string;
  collection: "categories";
  data: InferEntrySchema<"categories">;
}>;

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
