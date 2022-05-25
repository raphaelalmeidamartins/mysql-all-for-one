SELECT submitted_date
FROM northwind.purchase_orders
WHERE submitted_date
BETWEEN '2006-04-26 00:00:00'
AND '2006-04-26 23:59:59';