import type {Except} from './except';
// Omit 的严格版，第二个参数（key）必须存是第一个参数的key
/**
Create a type that requires at least one of the given keys. The remaining keys are kept as is.

@example
```
import type {RequireAtLeastOne} from 'type-fest';

type Responder = {
	text?: () => string;
	json?: () => string;

	secure?: boolean;
};

const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
	json: () => '{"message": "ok"}',
	secure: true
};
```
 // 'text' or 'json' must be at least one of responder's keys,  'secure' must be required in  responder's keys

@category Object
*/
export type RequireAtLeastOne<
	ObjectType,
	KeysType extends keyof ObjectType = keyof ObjectType,
		//  KeysType are belong to the keys of ObjectType, KeysType is not necessary for RequireAtLeastOne;
> = {
	// For each `Key` in `KeysType` make a mapped type:
	[Key in KeysType]-?: Required<Pick<ObjectType, Key>> & // 1. Make `Key`'s type required
	// 2. Make all other keys in `KeysType` optional
	Partial<Pick<ObjectType, Exclude<KeysType, Key>>>;
}[KeysType] &
// 3. Add the remaining keys not in `KeysType`
		// such as Responder, 'secure' is the remaining key,
		// Except<ObjectType, KeysType>: Except items of ObjectType, that keys of items are equal to KeysType
Except<ObjectType, KeysType>;

// -?: remove '?'

// type Required<T> = { [P in keyof T]-?: T[P] };  //  make all items must be required.

// type Partial<T> = {[P in key of T]?: T[P]};  // make all items be optional.

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };   // pick items from T, the keys of items are equal to K.

// {
//  text: {text: () => string ; json?: () => string }
// 	json: {json: () => string ; text?: () => string }
// }['text' | 'json']
//

// 1, 2, 3 are important

