import type {Except} from './except';
import type {Simplify} from './simplify';

type Merge_<FirstType, SecondType> = Except<FirstType, Extract<keyof FirstType, keyof SecondType>> & SecondType;

//  Extract<keyof FirstType, keyof SecondType> 获取两种类型的的共有字段
// Omit<FirstType,keyof SecondType> & SecondType
/**
Merge two types into a new type. Keys of the second type overrides keys of the first type.

@example
```
import type {Merge} from 'type-fest';

type Foo = {
	a: number;
	b: string;
};

type Bar = {
	b: number;
};

const ab: Merge<Foo, Bar> = {a: 1, b: 2};
```

@category Object
*/
export type Merge<FirstType, SecondType> = Simplify<Merge_<FirstType, SecondType>>;
