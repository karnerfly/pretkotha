package enum

type Filter int

const (
	PostFilterNewest Filter = iota
	PostFilterOldest
	PostFilterMostPopular
)
