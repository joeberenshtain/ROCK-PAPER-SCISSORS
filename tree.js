const rock = 0;
const paper = 1;
const scissors = 2;
class TreeNode
{
    constructor(value)
    {
        this.value = value;
        this.descendants = [];
        this.parent = null;
    }
    get highest()
    {
        if (this.descendants[0] > this.descendants[1] > this.descendants[2])
        {
            return 0;
        }
        else if (this.descendants[1] > this.descendants[2])
        {
            return 1;
        }
        else
        {
            return 2;
        }
    }
    get rock()
    {
        return this.descendants[rock];
    }
    set rock(node)
    {
        this.descendants[rock] = node;
        if (node)
        {
            node.parent = this;
        }
    }
    get paper()
    {
        return this.descendants[paper];
    }
    set paper(node)
    {
        this.descendants[paper] = node;
        if (node)
        {
            node.parent = this;
        }
    }
    get scissors()
    {
        return this.descendants[scissors];
    }
    set scissors(node)
    {
        this.descendants[scissors] = node;
        if (node)
        {
            node.parent = this;
        }
    }
    line()
    {
        this.descendants[rock] = new TreeNode(0)
        this.descendants[paper] = new TreeNode(0)
        this.descendants[scissors] = new TreeNode(0)
    }
    descendWeight(arr)
    {
        if (this == undefined) return 0;
        let weight = 0;
        let node = this
        for (let i in arr)
        {
            if (node == undefined) return weight;
            weight += node.value * i ** 2;
            node = node.descendants[arr[arr.length - 1 - i]]
        }
        return weight
    }
}
class BinarySearchTree
{
    constructor()
    {
        this.root = new TreeNode(0);
        this.size = 0;
    }
    add(arr)
    {
        let node = this.root
        for (let i in arr)
        {
            if (node.value == 0) node.line()
            node.value++
            node = node.descendants[arr[arr.length - 1 - i]]
        }
    }
}