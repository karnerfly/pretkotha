package enum

type Sort int
type Filter int

const (
	PostSortNewest Sort = iota
	PostSortOldest
	PostSortMostPopular
)

const (
	PostFilterStory Filter = iota
	PostFilterDrawing
	PostFilterAll
)
